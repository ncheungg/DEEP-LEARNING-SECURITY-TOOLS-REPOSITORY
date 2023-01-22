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
from cleverhans.tf2.attacks.fast_gradient_method import fast_gradient_method
from cleverhans.tf2.attacks.basic_iterative_method import basic_iterative_method
from cleverhans.tf2.attacks.madry_et_al import madry_et_al
from cleverhans.tf2.attacks.carlini_wagner_l2 import carlini_wagner_l2
from cleverhans.tf2.attacks.momentum_iterative_method import momentum_iterative_method
from cleverhans.tf2.attacks.spsa import spsa

gcp_project_id = "silken-campus-375517"
def download_blob(bucket_name, source_blob_name, destination_folder_name):
    storage_client = storage.Client(project=gcp_project_id)

    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    data = io.BytesIO(blob.download_as_string())

    with zipfile.ZipFile(data) as z:
        z.extractall('/tmp/')

@functions_framework.http
def attack_function(request):

    request_json = request.get_json(silent=True)
    
        
    bucket_name = "capstone-test-bucket"
    model_name = request_json['model_name']
    dataset_name = request_json['dataset_name']
    
    download_blob("capstone-test-bucket", model_name, model_name[:-4])
    model = tf.keras.models.load_model(f"/tmp/{model_name[:-4]}")
    #remove the model from memory after its loaded to save memory
    shutil.rmtree(f"/tmp/{model_name[:-4]}", ignore_errors=True)
    
    download_blob("capstone-test-bucket", dataset_name, dataset_name[:-4])
    
    builder = tfds.builder_from_directory(f"/tmp/{dataset_name[:-4]}")
    test_data = builder.as_dataset(split='test[:2%]', batch_size=128)
    #shutil.rmtree(f"/tmp/{dataset_name[:-4]}", ignore_errors=True)
    
    test_acc_clean = tf.metrics.SparseCategoricalAccuracy()
    test_acc_fgm = tf.metrics.SparseCategoricalAccuracy()
    test_acc_pgd = tf.metrics.SparseCategoricalAccuracy()
    test_acc_bim = tf.metrics.SparseCategoricalAccuracy()
    test_acc_mea = tf.metrics.SparseCategoricalAccuracy()
    test_acc_mim = tf.metrics.SparseCategoricalAccuracy()
    #test_acc_spsa = tf.metrics.SparseCategoricalAccuracy()
    #test_acc_cw = tf.metrics.SparseCategoricalAccuracy()

    order_of_norm_lookup = {"inf" : np.inf, "1" : 1, "2" : 2}
    order_of_norm = order_of_norm_lookup[request_json['order_of_norm']]

    progress_bar_test = tf.keras.utils.Progbar(200)
    for sample in test_data:

        x = sample['image']
        y = sample['label']
       
        if(request_json['attack_name'] == "None"):
            y_pred = model(x)
            test_acc_clean(y, y_pred)
       
        elif(request_json['attack_name'] == "FGM"):
            x_fgm = fast_gradient_method(model_fn = model, x = x, eps = request_json["epsilon"], norm = order_of_norm)
            y_pred_fgm = model(x_fgm)
            test_acc_fgm(y, y_pred_fgm)
   
        elif(request_json['attack_name'] == 'PGD'):
            x_pgd = projected_gradient_descent(model_fn = model, x = x, eps = request_json["epsilon"], eps_iter = request_json["epsilon_iter"], nb_iter = request_json["attack_iter"], norm = order_of_norm)
            y_pred_pgd = model(x_pgd)
            test_acc_pgd(y, y_pred_pgd)
        
        elif(request_json['attack_name'] == 'BIM'):
            x_bim = basic_iterative_method(model_fn = model, x = x, eps = request_json["epsilon"], eps_iter = request_json["epsilon_iter"], nb_iter = request_json["attack_iter"], norm = order_of_norm, rand_init = 0)
            y_pred_bim = model(x_bim)
            test_acc_bim(y, y_pred_bim)

        elif(request_json['attack_name'] == 'MEA'):
            x_mea = madry_et_al(model_fn = model, x = x, eps = request_json["epsilon"], eps_iter = request_json["epsilon_iter"], nb_iter = request_json["attack_iter"], norm = order_of_norm)
            y_pred_mea = model(x_mea)
            test_acc_mea(y, y_pred_mea)

        elif(request_json['attack_name'] == 'MIM'):
            x_mim = momentum_iterative_method(model_fn = model, x = x, eps = request_json['epsilon'], eps_iter = request_json["epsilon_iter"], nb_iter = request_json["attack_iter"], norm = order_of_norm, decay_factor = request_json['decay_factor'])
            y_pred_mim = model(x_mim)
            test_acc_mim(y, y_pred_mim)

        #elif(request_json['attack_name'] == 'SPSA'):
        #    x_spsa = spsa(model_fn = model, x = x, y = y, eps = request_json['epsilon'], nb_iter = request_json["attack_iter"])
        #    y_pred_spsa = model(x_spsa)
        #    test_acc_spsa(y, y_pred_spsa)

        #elif(request_json['attack_name'] == 'CWL2'):
        #    x_cw = carlini_wagner_l2(model_fn = model, x = x)
        #    y_pred_cw = model(x_cw)
        #    test_acc_cw(y, y_pred_cw)

        progress_bar_test.add(x.shape[0])
       
    
    if(request_json['attack_name'] == "None"):
        message = "test acc on clean examples (%): {:.3f}".format(test_acc_clean.result() * 100)
    elif(request_json['attack_name'] == "FGM"):
        message = "test acc on Fast Gradient Method adversarial examples (%): {:.3f}".format(test_acc_fgm.result() * 100)
    elif(request_json['attack_name'] == "PGD"):
        message = "test acc on Projected Gradient Descent adversarial examples (%): {:.3f}".format(test_acc_pgd.result() * 100)
    elif(request_json['attack_name'] == "BIM"):
        message = "test acc on Basic Iterative Method adversarial examples (%): {:.3f}".format(test_acc_bim.result() * 100)
    elif(request_json['attack_name'] == "MEA"):
        message = "test acc on Madry et al adversarial examples (%): {:.3f}".format(test_acc_mea.result() * 100)
    elif(request_json['attack_name'] == "MIM"):
        message = "test acc on Momentum Iterative Method adversarial examples (%): {:.3f}".format(test_acc_mim.result() * 100)
    #elif(request_json['attack_name'] == "SPSA"):
    #    message = "test acc on SPSA adversarial examples (%): {:.3f}".format(test_acc_spsa.result() * 100)   
    #else if(request_json['attack_name'] == "CWL2"):
    #    message = "test acc on Carlini Wagner L2 adversarial examples (%): {:.3f}".format(test_acc_cw.result() * 100)
    
    return { 
        'result: ' : message
    } 