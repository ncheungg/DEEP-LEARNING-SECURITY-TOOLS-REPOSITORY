import tensorflow as tf
import foolbox as fb
import numpy as np
import matplotlib.pyplot as plt
import tensorflow_datasets as tfds
from tensorflow.python.ops.numpy_ops import np_config
import json

import functions_framework

# constants
GCP_PROJECT_ID = "silken-campus-375517"
BUCKET_NAME = "capstone-test-bucket"


# enable numpy related methods
np_config.enable_numpy_behavior()


def preprocess_dataset(dataset, dataset_info):
    images = np.array([sample['image'] for sample in dataset])
    labels = np.array([sample['label'] for sample in dataset])

    # checks if the 'image' feature is of type 'INT'
    for feature in dataset_info['schema']['feature']:
        if feature['name'] == 'image' and feature['type'] == 'INT':
            images = tf.cast(images, tf.float32)
            break

    # checks the 'test' dataset with 'image' feature has a max value of 255
    stop = False
    for split in dataset_info['splits']:
        if split['name'] == 'test':
            for feature in split['statistics']['features']:
                if feature['name'] == 'image' and feature['numStats']['max'] == 255:
                    images /= 127.5
                    images -= 1.0
                    stop = True
                    break
        # breaks out of nested for loop
        if stop:
            break

    return images, labels


@functions_framework.http
def attack_endpoint(request):
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return '', 204, headers

    request_json = request.get_json(silent=True)

    # model parameters
    model_name = request_json['model_name']
    dataset_name = request_json['dataset_name']

    # attack input parameters
    model_lower_bound = request_json['model_lower_bound']
    model_upper_bound = request_json['model_upper_bound']
    epsilon_max = request_json['epsilon_max']
    epsilon_num = request_json['epsilon_num']

    # load model from gcp bucket
    model = tf.keras.models.load_model(f'gs://{BUCKET_NAME}/{model_name}')

    # load dataset from gcp bucket
    builder = tfds.builder_from_directory(f'gs://{BUCKET_NAME}/{dataset_name}')
    dataset = builder.as_dataset(split='test[:2%]')

    # extract images and labels
    images, labels = preprocess_dataset(dataset)

    # run the attack
    epsilons, accuracy = linf_deep_fool_attack(model, model_lower_bound, model_upper_bound,
                                               images, labels, epsilon_max, epsilon_num)

    # client = storage.Client()
    # bucket = client.get_bucket(BUCKET_NAME)
    # file_obj = bucket.get_blob(f'{dataset_name}/dataset_info.json')
    #
    # # Read the contents of the file
    # file_contents = file_obj.download_as_string()
    #
    # # Convert the file contents to a JSON object
    # dataset_info = json.loads(file_contents)

    response_body = {
        'epsilons': epsilons.tolist(),
        'accuracy': accuracy.tolist()
    }

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    return response_body, 200, headers


def linf_deep_fool_attack(model, model_lower_bound, model_upper_bound, images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.LinfDeepFoolAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return epsilons, robust_accuracy


def gaussian_blur_attack(model, model_lower_bound, model_upper_bound, images, labels):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.GaussianBlurAttack()
    # epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=0.1)

    print(is_adv)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return robust_accuracy


def salt_and_pepper_noise_attack(model, model_lower_bound, model_upper_bound, images, labels):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.SaltAndPepperNoiseAttack()

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=0.1)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return robust_accuracy


def linf_deep_fool_attack_show_graph(model, model_lower_bound, model_upper_bound, images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.LinfDeepFoolAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    plt.plot(epsilons, robust_accuracy.numpy())
    plt.ylim(0, 100)

    plt.title("DeepFool L-Infinity Attack")
    plt.xlabel("Epsilons (ε)")
    plt.ylabel("Accuracy (%)")

    plt.show()

def inversion_attack(model, model_lower_bound, model_upper_bound, images, labels):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.InversionAttack()

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=0.1)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return robust_accuracy


def binary_search_contrast_reduction_attack(model, model_lower_bound, model_upper_bound, images, labels):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.BinarySearchContrastReductionAttack()

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=None)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return robust_accuracy


def linear_search_contrast_reduction_attack(model, model_lower_bound, model_upper_bound, images, labels):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.LinearSearchContrastReductionAttack()

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=None)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return robust_accuracy


def l2_basic_iterative_attack(model, model_lower_bound, model_upper_bound, images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.L2BasicIterativeAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return epsilons, robust_accuracy


def linf_basic_iterative_attack(model, model_lower_bound, model_upper_bound, images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.LinfBasicIterativeAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return epsilons, robust_accuracy

def l2_additive_gaussian_noise_attack(model, model_lower_bound, model_upper_bound,
                                      images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.L2AdditiveGaussianNoiseAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return robust_accuracy


def l2_clipping_aware_additive_gaussian_noise_attack(model, model_lower_bound, model_upper_bound,
                                                     images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.L2ClippingAwareAdditiveGaussianNoiseAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return robust_accuracy


def l2_repeated_additive_gaussian_noise_attack(model, model_lower_bound, model_upper_bound,
                                               images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.L2RepeatedAdditiveGaussianNoiseAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return robust_accuracy


def l2_clipping_aware_repeated_additive_gaussian_noise_attack(model, model_lower_bound, model_upper_bound,
                                                              images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.L2ClippingAwareRepeatedAdditiveGaussianNoiseAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return robust_accuracy


if __name__ == "__main__":
    f = open(r'/mnt/d/Nathan/Downloads/cifar10/dataset_info.json')
    dataset_info = json.load(f)

    # model = tf.keras.models.load_model(r'D:\Nathan\Downloads\test_model')
    model = tf.keras.models.load_model(r'/mnt/d/Nathan/Downloads/test_model')

    # builder = tfds.builder_from_directory(r'D:\Nathan\Downloads\cifar10')
    builder = tfds.builder_from_directory(r'/mnt/d/Nathan/Downloads/cifar10')
    dataset = builder.as_dataset(split='test[:2%]')

    model_lower_bound = -1
    model_upper_bound = 1

    images, labels = preprocess_dataset(dataset, dataset_info)

    epsilon_max = 0.01
    epsilon_num = 21
    target = 0.6
    
    attack_types = ['linear', 'binary']

    response_body = {}

    # run the attacks
    for attack_type in attack_types:
        if attack_type == 'binary':
            accuracy = binary_search_contrast_reduction_attack(model, model_lower_bound, model_upper_bound,
                                                               images, labels)

            response_body[attack_type] = accuracy.tolist()

        elif attack_type == 'linear':
            accuracy = linear_search_contrast_reduction_attack(model, model_lower_bound, model_upper_bound,
                                                               images, labels)

            response_body[attack_type] = accuracy.tolist()

    print(response_body)
