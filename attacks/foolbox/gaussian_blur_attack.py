import tensorflow as tf
import foolbox as fb
import numpy as np
import tensorflow_datasets as tfds
from tensorflow.python.ops.numpy_ops import np_config

import functions_framework

# constants
BUCKET_NAME = "dlstr-bucket"


def preprocess_dataset(dataset):
    images = np.array([sample['image'] for sample in dataset])
    labels = np.array([sample['label'] for sample in dataset])

    images = tf.cast(images, tf.float32)
    images /= 127.5
    images -= 1.0
    return images, labels


def gaussian_blur_attack(model, model_lower_bound, model_upper_bound, images, labels):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    # fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.GaussianBlurAttack()

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=None)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return robust_accuracy


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

    # enable numpy related methods
    np_config.enable_numpy_behavior()

    # model parameters
    model_name = request_json['model_name']
    dataset_name = request_json['dataset_name']

    # attack input parameters
    model_lower_bound = request_json['model_lower_bound']
    model_upper_bound = request_json['model_upper_bound']

    # load model from gcp bucket
    model = tf.keras.models.load_model(f'gs://{BUCKET_NAME}/{model_name}')

    # load dataset from gcp bucket
    builder = tfds.builder_from_directory(f'gs://{BUCKET_NAME}/{dataset_name}')

    dataset = builder.as_dataset(split='test[:1%]')

    # extract images and labels
    images, labels = preprocess_dataset(dataset)

    # run the attack
    accuracy = gaussian_blur_attack(model, model_lower_bound, model_upper_bound, images, labels)

    response_body = {
        'accuracy': accuracy.tolist()
    }

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    return response_body, 200, headers
