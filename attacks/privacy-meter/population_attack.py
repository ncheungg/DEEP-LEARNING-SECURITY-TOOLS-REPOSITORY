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

from privacy_meter.audit import Audit, MetricEnum
from privacy_meter.audit_report import ROCCurveReport, SignalHistogramReport
from privacy_meter.constants import InferenceGame
from privacy_meter.dataset import Dataset
from privacy_meter.information_source import InformationSource
from privacy_meter.model import TensorflowModel
from privacy_meter import audit_report

def data_preprocessing(dataset, num_classes, dataset_info):
    labels = np.array([sample['label'] for sample in dataset])
    images = np.array([sample['image'] for sample in dataset])
    if(dataset_info['schema']['feature'][1]['type'] == "INT"):
        images = tf.cast(images, tf.float32)
        
    for i in dataset_info['splits'][0]['statistics']['features']:
        if(i['name'] == "image"):
            if(i['numStats']['max'] == 255):
                images /= 255

    labels = tf.keras.utils.to_categorical(labels, num_classes)

    return images, labels

@functions_framework.http
def mlpm_population_attack_func(request):

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
    num_classes = request_json['num_classes']
    loss_func_key = request_json['loss_func']

    loss_func_dict = {"Categorical Crossentropy" : tf.keras.losses.CategoricalCrossentropy()}
    loss_func = loss_func_dict[loss_func_key]

    gcs_path = "gs://{}/{}".format(bucket_name, model_name)
    model = tf.keras.models.load_model(gcs_path)
    
    gcs_path = "gs://{}/{}".format(bucket_name, dataset_name)
    client = storage.Client()
    bucket = client.get_bucket(bucket_name)
    file_obj = bucket.get_blob(f"{dataset_name}/dataset_info.json")
    file_contents = file_obj.download_as_string()
    dataset_info = json.loads(file_contents)
    
    test_images = 500
    train_images = 500
    for i in dataset_info['splits']:
        if(i['name'] == "test"):
            test_images = min(500,int(i['shardLengths'][0]))
        if(i['name'] == "train"):
            train_images = min(500,int(i['shardLengths'][0]))

    builder = tfds.builder_from_directory(gcs_path)
    test_data, train_data, population_data = builder.as_dataset(split=[f'test[:{test_images}]', f'train[:{train_images}]', f'test[{test_images}:{3*test_images}]'])
    
    fpr_tolerance_list = [
        0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0
    ]
    
    train_images, train_labels = data_preprocessing(train_data, num_classes, dataset_info)
    test_images, test_labels = data_preprocessing(test_data, num_classes, dataset_info)
    population_images, population_labels = data_preprocessing(population_data, num_classes, dataset_info)
 
    
    # create the target model's dataset
    train_ds = {'x': train_images, 'y': train_labels}
    test_ds = {'x': test_images, 'y': test_labels}
    target_dataset = Dataset(
        data_dict={'train': train_ds, 'test': test_ds},
        default_input='x', default_output='y'
    )

    # create the reference dataset
    population_ds = {'x': population_images, 'y': population_labels}
    reference_dataset = Dataset(
        # this is the default mapping that a Metric will look for
        # in a reference dataset
        data_dict={'train': population_ds},
        default_input='x', default_output='y'
    )


    target_model = TensorflowModel(model_obj=model, loss_fn= loss_func)

    target_info_source = InformationSource(
        models=[target_model], 
        datasets=[target_dataset]
    )

    reference_info_source = InformationSource(
        models=[target_model],
        datasets=[reference_dataset]
    )

    audit_obj = Audit(
        metrics=MetricEnum.POPULATION,
        inference_game_type=InferenceGame.PRIVACY_LOSS_MODEL,
        target_info_sources=target_info_source,
        reference_info_sources=reference_info_source,
        fpr_tolerances=fpr_tolerance_list
    )

    tp_l = []
    fp_l = []
    tn_l = []
    fn_l = []
    acc = []
    roc_auc = []
    
    audit_obj.prepare()
    audit_results = audit_obj.run()[0]
    
    for result in audit_results:
        fp_l.append(result.fp)
        tp_l.append(result.tp)
        tn_l.append(result.tn)
        fn_l.append(result.fn)
        acc.append(result.accuracy)
        roc_auc.append(result.roc_auc)
    
    tp_l = np.array(tp_l)
    fp_l = np.array(fp_l)
    tn_l = np.array(tn_l)
    fn_l = np.array(fn_l)

    tpr = tp_l/(tp_l+fn_l)
    fpr = fp_l/(fp_l+tn_l)
    
    data = {"false_positive_rate" : fpr.tolist(),
            "accuracy" : acc,
            "roc_auc" : roc_auc,
            "true_negative" : tn_l.tolist(),
            "false_positives" : fp_l.tolist(),
            "false_negatives" : fn_l.tolist(),
            "true_positives" : tp_l.tolist()
            }
  
    # Set CORS headers for the main request
    headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }

    return (json.dumps(data), 200, headers)

