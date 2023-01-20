import os
import math
import json
import zipfile
import tempfile

import s3fs

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

def get_s3fs():
    return s3fs.S3FileSystem(key=os.environ['aws_access_key'], secret=os.environ['aws_access_secret'])

def s3_unzip_folder(bucket_name: str, folder_name: str):
  with tempfile.TemporaryDirectory() as tempdir:
    s3fs = get_s3fs()
    s3fs.get(f"{bucket_name}/{folder_name}.zip", f"{tempdir}/{folder_name}.zip")

    with zipfile.ZipFile(f"{tempdir}/{folder_name}.zip") as zip_ref:
        zip_ref.extractall(f"{tempdir}/{folder_name}")

    return tempdir

def lambda_handler(event, context):

    bucket_name = "source-bucket"
    model_name = event['model_name']
    dataset_name = event['dataset_name']

    tempdir = s3_unzip_folder(bucket_name,model_name)
    model = keras.models.load_model(f"{tempdir}/{model_name}")
    
    tempdir = s3_unzip_folder(bucket_name, dataset_name)
    
    builder = tfds.builder_from_directory(f"{tempdir}/{dataset_name}")
    test_data = builder.as_dataset(split='test[:2%]', batch_size=128)

    test_acc_clean = tf.metrics.SparseCategoricalAccuracy()
    test_acc_fgm = tf.metrics.SparseCategoricalAccuracy()
    test_acc_pgd = tf.metrics.SparseCategoricalAccuracy()
    test_acc_bim = tf.metrics.SparseCategoricalAccuracy()
    test_acc_mea = tf.metrics.SparseCategoricalAccuracy()
    test_acc_mim = tf.metrics.SparseCategoricalAccuracy()
    #test_acc_spsa = tf.metrics.SparseCategoricalAccuracy()
    #test_acc_cw = tf.metrics.SparseCategoricalAccuracy()

    order_of_norm_lookup = {"inf" : np.inf, "1" : 1, "2" : 2}
    order_of_norm = order_of_norm_lookup[event['order_of_norm']]

    progress_bar_test = tf.keras.utils.Progbar(200)
    for sample in test_data:

        x = sample['image']
        y = sample['label']
       
        if(event['attack_name'] == "None"):
            y_pred = model(x)
            test_acc_clean(y, y_pred)
       
        elif(event['attack_name'] == "FGM"):
            x_fgm = fast_gradient_method(model_fn = model, x = x, eps = event["epsilon"], norm = order_of_norm)
            y_pred_fgm = model(x_fgm)
            test_acc_fgm(y, y_pred_fgm)
   
        elif(event['attack_name'] == 'PGD'):
            x_pgd = projected_gradient_descent(model_fn = model, x = x, eps = event["epsilon"], eps_iter = event["epsilon_iter"], nb_iter = event["attack_iter"], norm = order_of_norm)
            y_pred_pgd = model(x_pgd)
            test_acc_pgd(y, y_pred_pgd)
        
        elif(event['attack_name'] == 'BIM'):
            x_bim = basic_iterative_method(model_fn = model, x = x, eps = event["epsilon"], eps_iter = event["epsilon_iter"], nb_iter = event["attack_iter"], norm = order_of_norm, rand_init = 0)
            y_pred_bim = model(x_bim)
            test_acc_bim(y, y_pred_bim)

        elif(event['attack_name'] == 'MEA'):
            x_mea = madry_et_al(model_fn = model, x = x, eps = event["epsilon"], eps_iter = event["epsilon_iter"], nb_iter = event["attack_iter"], norm = order_of_norm)
            y_pred_mea = model(x_mea)
            test_acc_mea(y, y_pred_mea)

        elif(event['attack_name'] == 'MIM'):
            x_mim = momentum_iterative_method(model_fn = model, x = x, eps = event['epsilon'], eps_iter = event["epsilon_iter"], nb_iter = event["attack_iter"], norm = order_of_norm, decay_factor = event['decay_factor'])
            y_pred_mim = model(x_mim)
            test_acc_mim(y, y_pred_mim)

        #elif(event['attack_name'] == 'SPSA'):
        #    x_spsa = spsa(model_fn = model, x = x, y = y, eps = event['epsilon'], nb_iter = event["attack_iter"])
        #    y_pred_spsa = model(x_spsa)
        #    test_acc_spsa(y, y_pred_spsa)

        #elif(event['attack_name'] == 'CWL2'):
        #    x_cw = carlini_wagner_l2(model_fn = model, x = x)
        #    y_pred_cw = model(x_cw)
        #    test_acc_cw(y, y_pred_cw)

        progress_bar_test.add(x.shape[0])
       
    
    if(event['attack_name'] == "None"):
        message = "test acc on clean examples (%): {:.3f}".format(test_acc_clean.result() * 100)
    elif(event['attack_name'] == "FGM"):
        message = "test acc on Fast Gradient Method adversarial examples (%): {:.3f}".format(test_acc_fgm.result() * 100)
    elif(event['attack_name'] == "PGD"):
        message = "test acc on Projected Gradient Descent adversarial examples (%): {:.3f}".format(test_acc_pgd.result() * 100)
    elif(event['attack_name'] == "BIM"):
        message = "test acc on Basic Iterative Method adversarial examples (%): {:.3f}".format(test_acc_bim.result() * 100)
    elif(event['attack_name'] == "MEA"):
        message = "test acc on Madry et al adversarial examples (%): {:.3f}".format(test_acc_mea.result() * 100)
    elif(event['attack_name'] == "MIM"):
        message = "test acc on Momentum Iterative Method adversarial examples (%): {:.3f}".format(test_acc_mim.result() * 100)
    #elif(event['attack_name'] == "SPSA"):
    #    message = "test acc on SPSA adversarial examples (%): {:.3f}".format(test_acc_spsa.result() * 100)   
    #else if(event['attack_name'] == "CWL2"):
    #    message = "test acc on Carlini Wagner L2 adversarial examples (%): {:.3f}".format(test_acc_cw.result() * 100)
    
    return { 
        'result: ' : message
    } 
 