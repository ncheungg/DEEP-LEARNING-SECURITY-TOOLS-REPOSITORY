import tensorflow as tf
import foolbox as fb
import numpy as np
import tensorflow_datasets as tfds
from tensorflow.python.ops.numpy_ops import np_config

from google.cloud import storage
import json

import functions_framework

# constants
bucket_name = "dlstr-bucket"
norm_dict = {"1" : fb.attacks.L1FastGradientAttack(), "2" : fb.attacks.L2FastGradientAttack(), "inf" : fb.attacks.LinfFastGradientAttack()}

def preprocess_dataset(dataset, dataset_info):
    images = np.array([sample['image'] for sample in dataset])
    labels = np.array([sample['label'] for sample in dataset])

    if(dataset_info['schema']['feature'][1]['type'] == "INT"):
        images = tf.cast(images, tf.float32)
        
    for i in dataset_info['splits'][0]['statistics']['features']:
        if(i['name'] == "image"):
            if(i['numStats']['max'] == 255):
                images /= 127.5
                images -= 1.0
                
    return images, labels


def fgm_attack(model, model_lower_bound, model_upper_bound, images, labels, epsilon, norm):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    
    attack = norm_dict[norm]

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilon)

    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    return robust_accuracy


@functions_framework.http
def foolbox_fgm_func(request):
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
    epsilon = request_json['epsilon']
    norm = request_json['norm']

    # load model from gcp bucket
    model = tf.keras.models.load_model(f'gs://{bucket_name}/{model_name}')

    client = storage.Client()
    bucket = client.get_bucket(bucket_name)
    file_obj = bucket.get_blob(f"{dataset_name}/dataset_info.json")
    file_contents = file_obj.download_as_string()
    dataset_info = json.loads(file_contents)
    
    split = 'test'
    for i in dataset_info['splits']:
        if(i['name'] == "test"):
            absolute = min(100,int(i['shardLengths'][0]))
            split = f'test[:{absolute}]'

    # load dataset from gcp bucket
    builder = tfds.builder_from_directory(f'gs://{bucket_name}/{dataset_name}')

    dataset = builder.as_dataset(split = split)

    # extract images and labels
    images, labels = preprocess_dataset(dataset, dataset_info)

    # run the attack
    accuracy = fgm_attack(model, model_lower_bound, model_upper_bound,
                                               images, labels, epsilon, norm)

    response_body = {
        'accuracy': accuracy.tolist()
    }

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    return response_body, 200, headers
