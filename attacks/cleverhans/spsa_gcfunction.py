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

from cleverhans.tf2.attacks.spsa import spsa

def process_data(x, dataset_info):
    if(dataset_info['schema']['feature'][1]['type'] == "INT"):
        x = tf.cast(x, tf.float32)
        print(dataset_info['schema']['feature'][1]['type'])

    for i in dataset_info['splits'][0]['statistics']['features']:
        if(i['name'] == "image"):
            if(i['numStats']['max'] == 255):
                x /= 127.5
                x -= 1
                print(dataset_info['splits'][0]['statistics']['features'][1]['numStats']['max'])
    return x

@functions_framework.http
def cleverhans_spsa_func(request):

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
            absolute = min(20,int(i['shardLengths'][0]))
            split = f'test[:{absolute}]'
            print(split)

    builder = tfds.builder_from_directory(gcs_path)
    #spsa attack requires batch size = 1
    test_data = builder.as_dataset(split = split, batch_size=1)
   
    test_acc_spsa = tf.metrics.SparseCategoricalAccuracy()

    progress_bar_test = tf.keras.utils.Progbar(absolute)
    for sample in test_data:

        x = sample['image']
        y = sample['label']

        x = process_data(x, dataset_info)

        x_spsa = spsa(model_fn = model, x = x, y = y, eps = request_json['epsilon'], nb_iter = request_json["attack_iter"], clip_min = -1.0, clip_max = 1.0)
        y_pred_spsa = model(x_spsa)
        test_acc_spsa(y, y_pred_spsa)

        progress_bar_test.add(x.shape[0])
       
    data = {"accuracy" : round(float(test_acc_spsa.result()) * 100, 2)}
  
    # Set CORS headers for the main request
    headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }

    return (json.dumps(data), 200, headers)
