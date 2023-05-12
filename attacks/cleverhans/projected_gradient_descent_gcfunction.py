import os
import shutil
import io
import math
import json
import zipfile
import tempfile

from google.cloud import storage
import functions_framework

import numpy as np
import tensorflow as tf 
import tensorflow_datasets as tfds
from tensorflow.keras import Model
from keras.layers import Input

from cleverhans.tf2.attacks.projected_gradient_descent import projected_gradient_descent

def process_data(x, dataset_info):
    if(dataset_info['schema']['feature'][1]['type'] == "INT"):
        x = tf.cast(x, tf.float32)

    for i in dataset_info['splits'][0]['statistics']['features']:
        if(i['name'] == "image"):
            if(i['numStats']['max'] == 255):
                x /= 127.5
                x -= 1
    return x

@functions_framework.http
def cleverhans_pgd_func(request):

    if request.method == 'OPTIONS':
        # Allows POST requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    request_json = request.get_json(silent=True)
    
    bucket_name = "dlstr-bucket"
    model_name = request_json['model_name']
    dataset_name = request_json['dataset_name']
    epsilons = request_json['epsilons']

    gcs_path = "gs://{}/{}".format(bucket_name, model_name)
    model = tf.keras.models.load_model(gcs_path)
    
    gcs_path = "gs://{}/{}".format(bucket_name, dataset_name)
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

    builder = tfds.builder_from_directory(gcs_path)
    test_data = builder.as_dataset(split = split, batch_size=128)
   
    images = np.array([sample['image'] for sample in test_data])
    labels = np.array([sample['label'] for sample in test_data])

    images = process_data(images, dataset_info)

    order_of_norm_lookup = {"inf" : np.inf, "1" : 1, "2" : 2}
    order_of_norm = order_of_norm_lookup[request_json['order_of_norm']]
    
    accuracy_list = []

    for eps in epsilons:
        test_acc_pgd = tf.metrics.SparseCategoricalAccuracy()
        for i in range(len(images)):

            x = images[i]
            y = labels[i]

            x_pgd = projected_gradient_descent(model_fn = model, x = x, eps = eps, eps_iter = request_json["epsilon_iter"], nb_iter = request_json["attack_iter"], norm = order_of_norm)
            y_pred_pgd = model(x_pgd)
            test_acc_pgd(y, y_pred_pgd)
        
        accuracy_list.append(round(float(test_acc_pgd.result()) * 100, 2))

    data = {"epsilons" : epsilons,
            "accuracy" : accuracy_list}
  
    # Set CORS headers for the main request
    headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }

    return (json.dumps(data), 200, headers)
