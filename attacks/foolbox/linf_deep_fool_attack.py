import tensorflow as tf
import foolbox as fb
import numpy as np
import matplotlib.pyplot as plt
import tensorflow_datasets as tfds
import json

from google.cloud import storage
import functions_framework

# constants
GCP_PROJECT_ID = "silken-campus-375517"
BUCKET_NAME = "capstone-test-bucket"


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
    dataset = builder.as_dataset(split='test[:2%]', batch_size=128)

    client = storage.Client()
    bucket = client.get_bucket(BUCKET_NAME)
    file_obj = bucket.get_blob(f'{dataset_name}/dataset_info.json')

    # Read the contents of the file
    file_contents = file_obj.download_as_string()

    # Convert the file contents to a JSON object
    dataset_info = json.loads(file_contents)

    response_body = {
        'epsilons': [],
        'accuracy': []
    }

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    return response_body, 200, headers


def linf_deep_fool_attack(model, model_lower_bound, model_upper_bound, images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.LinfDeepFoolAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)
    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    epsilons = epsilons.tolist()
    robust_accuracy = robust_accuracy.tolist()

    return epsilons, robust_accuracy


def linf_deep_fool_attack_show_graph(model, model_lower_bound, model_upper_bound, images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.LinfDeepFoolAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)

    print(raw, clipped, is_adv)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    plt.plot(epsilons, robust_accuracy.numpy())
    plt.ylim(0, 100)

    plt.title("DeepFool L-Infinity Attack")
    plt.xlabel("Epsilons (ε)")
    plt.ylabel("Accuracy (%)")

    plt.show()


if __name__ == "__main__":
    model = tf.keras.models.load_model(r'D:\Nathan\Downloads\test_model')

    builder = tfds.builder_from_directory(r'D:\Nathan\Downloads\cifar10')
    dataset = builder.as_dataset(split='test[:2%]')

    # model_lower_bound = -1
    model_lower_bound = 0
    model_upper_bound = 255

    images = [sample['image'] for sample in dataset]
    labels = [sample['label'] for sample in dataset]

    images = tf.TensorSpec.from_tensor(tf.convert_to_tensor(images), name='images')
    labels = tf.TensorSpec.from_tensor(tf.convert_to_tensor(labels), name='labels')

    # images = tf.convert_to_tensor(images)
    # labels = tf.convert_to_tensor(labels)

    # images, labels = fb.utils.samples(
    #     fb.TensorFlowModel(model, bounds=(-1, 1), preprocessing=dict()).transform_bounds((0, 1)), dataset='imagenet',
    #     batchsize=30)

    epsilon_max = 0.01
    epsilon_num = 21

    linf_deep_fool_attack_show_graph(model, model_lower_bound, model_upper_bound, images, labels, epsilon_max, epsilon_num)
