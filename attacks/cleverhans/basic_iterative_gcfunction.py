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

from cleverhans.tf2.attacks.basic_iterative_method import basic_iterative_method

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
def cleverhans_fgm_func(request):
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
            if(int(i['shardLengths'][0]) > 200):
                percent = int(200/int(i['shardLengths'][0])*100)
                split = f'test[:{percent}%]'
                print(split)

    builder = tfds.builder_from_directory(gcs_path)
    test_data = builder.as_dataset(split = split, batch_size=128)
    
    test_acc_bim = tf.metrics.SparseCategoricalAccuracy()

    order_of_norm_lookup = {"inf" : np.inf, "1" : 1, "2" : 2}
    order_of_norm = order_of_norm_lookup[request_json['order_of_norm']]

    progress_bar_test = tf.keras.utils.Progbar(200)
    for sample in test_data:

        x = sample['image']
        y = sample['label']

        x = process_data(x, dataset_info)

        x_bim = basic_iterative_method(model_fn = model, x = x, eps = request_json["epsilon"], eps_iter = request_json["epsilon_iter"], nb_iter = request_json["attack_iter"], norm = order_of_norm, rand_init = 0)
        y_pred_bim = model(x_bim)
        test_acc_bim(y, y_pred_bim)

        progress_bar_test.add(x.shape[0])
       
    message = "test acc on Basic Iterative Method adversarial examples (%): {:.3f}".format(test_acc_bim.result() * 100)
  
    return { 
        'result: ' : message
    } 

