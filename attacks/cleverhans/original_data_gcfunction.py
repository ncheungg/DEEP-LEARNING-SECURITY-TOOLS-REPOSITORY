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
    
    #download_blob("capstone-test-bucket", model_name, model_name[:-4])
    gcs_path = "gs://{}/{}".format(bucket_name, model_name)
    #model = tf.keras.models.load_model(f"/tmp/{model_name[:-4]}")
    model = tf.keras.models.load_model(gcs_path)
    #shutil.rmtree(f"/tmp/{model_name[:-4]}", ignore_errors=True)
    
    #download_blob("capstone-test-bucket", dataset_name, dataset_name[:-4])
    gcs_path = "gs://{}/{}".format(bucket_name, dataset_name)
    #builder = tfds.builder_from_directory(f"/tmp/{dataset_name[:-4]}")
    builder = tfds.builder_from_directory(gcs_path)
    test_data = builder.as_dataset(split='test[:2%]', batch_size=128)
    
    client = storage.Client()
    bucket = client.get_bucket(bucket_name)
    file_obj = bucket.get_blob(f"{dataset_name}/dataset_info.json")

    # Read the contents of the file
    file_contents = file_obj.download_as_string()

    # Convert the file contents to a JSON object
    dataset_info = json.loads(file_contents)
    #with open("gs://{}/{}/dataset_info.json".format(bucket_name, dataset_name), "r") as f:
    #    dataset_info = json.load(f)

    test_acc = tf.metrics.SparseCategoricalAccuracy()

    progress_bar_test = tf.keras.utils.Progbar(200)
    for sample in test_data:

        x = sample['image']
        y = sample['label']

        x = process_data(x, dataset_info)

        y_pred = model(x)
        test_acc(y, y_pred)

        progress_bar_test.add(x.shape[0])
       
    message = "test acc on original data (%): {:.3f}".format(test_acc.result() * 100)
  
    return { 
        'result: ' : message
    } 
