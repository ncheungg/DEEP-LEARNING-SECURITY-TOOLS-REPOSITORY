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

    epsilons = np.arange(0, 0.22, 0.02)

    target = 0.6
    
    norms = ['2', 'linf']

    random_start = True

    response_body = {}

    # run the attacks
    for norm in norms:
        if norm == '2':
            linear_search_contrast_reduction_attack(model, model_lower_bound, model_upper_bound, images, labels)
        elif norm == 'linf':
            binary_search_contrast_reduction_attack(model, model_lower_bound, model_upper_bound, images, labels)

            # response_body[attack_type] = accuracy.tolist()

    # print(response_body)
