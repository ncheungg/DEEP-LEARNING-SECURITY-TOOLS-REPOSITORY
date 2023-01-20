import math
import json
import numpy as np
import tensorflow as tf
 
import tensorflow_datasets as tfds
 
from tensorflow.keras import Model
from keras.layers import Input
from cleverhans.tf2.attacks.projected_gradient_descent import projected_gradient_descent
from cleverhans.tf2.attacks.fast_gradient_method import fast_gradient_method
from cleverhans.tf2.attacks.carlini_wagner_l2 import carlini_wagner_l2
from tensorflow.keras.layers import AveragePooling2D, Conv2D
from cleverhans.tf2.attacks.momentum_iterative_method import momentum_iterative_method
from cleverhans.tf2.attacks.spsa import spsa

#import boto3
#import s3fs
import zipfile

import IPython.display as display

def parse_function(record):
    features = {
        'label': tf.io.FixedLenFeature((), dtype=tf.int64),
        'image': tf.io.FixedLenFeature((), dtype=tf.string)
    }
    example = tf.io.parse_single_example(record, features)
    example['image'] = tf.io.parse_tensor(example['image'], tf.uint64)
    example['image'] = tf.reshape(example['image'], shape=[32,32,3])
    #return example['image'], example['label']
    return example['image'], example['label']

def convert_types(image, label):
         image = tf.cast(image, tf.float32)
         image /= 127.5
         image -= 1.0
         return image, label



def lambda_handler(event, context):
    
    #s3 = boto3.resource('s3')
    #bucket = s3.Bucket('source-bucket')

    #response = bucket.download_file()

    #bucket_name = "source-bucket"
    model_name = event['model_name']
    dataset_name = event['dataset_name']

    
    model = tf.keras.models.load_model(f"{model_name}", compile=False)

    builder = tfds.builder_from_directory('cifar10/3.0.2/')

    test_data = builder.as_dataset(split='test[:2%]', batch_size=1)
    

    test_acc_clean = tf.metrics.SparseCategoricalAccuracy()
    test_acc_fgsm = tf.metrics.SparseCategoricalAccuracy()
    test_acc_pgd = tf.metrics.SparseCategoricalAccuracy()
    test_acc_cw = tf.metrics.SparseCategoricalAccuracy()
    test_acc_mim = tf.metrics.SparseCategoricalAccuracy()
    test_acc_spsa = tf.metrics.SparseCategoricalAccuracy()

    order_of_norm_lookup = {"inf" : np.inf, "1" : 1, "2" : 2}
    order_of_norm = order_of_norm_lookup[event['order_of_norm']]

    #print([(x, y) for x, y in test_data_decoded])
    progress_bar_test = tf.keras.utils.Progbar(200)
    for sample in test_data:
       # print(sample)
        x = sample['image']
        y = sample['label']
        x, y = convert_types(x, y)
       
        if(event['attack_name'] == "None"):
            y_pred = model(x)
            test_acc_clean(y, y_pred)
       
        elif(event['attack_name'] == "FGM"):
            x_fgm = fast_gradient_method(model_fn = model, x = x, eps = event["epsilon"], norm = order_of_norm)
            y_pred_fgm = model(x_fgm)
            test_acc_fgsm(y, y_pred_fgm)
   
        elif(event['attack_name'] == 'PGD'):
            x_pgd = projected_gradient_descent(model_fn = model, x = x, eps = event["epsilon"], eps_iter = event["epsilon_iter"], nb_iter = event["attack_iter"], norm = order_of_norm)
            y_pred_pgd = model(x_pgd)
            test_acc_pgd(y, y_pred_pgd)

        elif(event['attack_name'] == 'CWL2'):
            x_cw = carlini_wagner_l2(model_fn = model, x = x, clip_min = None)
            y_pred_cw = model(x_cw)
            test_acc_cw(y, y_pred_cw)

        elif(event['attack_name'] == 'MIM'):
            x_mim = momentum_iterative_method(model_fn = model, x = x, eps = event['epsilon'], eps_iter = event["epsilon_iter"], nb_iter = event["attack_iter"], norm = order_of_norm, decay_factor = event['decay_factor'])
            y_pred_mim = model(x_mim)
            test_acc_mim(y, y_pred_mim)

        elif(event['attack_name'] == 'SPSA'):
            x_spsa = spsa(model_fn = model, x = x, y = y, eps = event['epsilon'], nb_iter = event["attack_iter"], clip_min = 0.0, clip_max = 11.0)
            y_pred_spsa = model(x_spsa)
            test_acc_spsa(y, y_pred_spsa)

        progress_bar_test.add(x.shape[0])
       
    
    if(event['attack_name'] == "None"):
        message = "test acc on clean examples (%): {:.3f}".format(test_acc_clean.result() * 100)
    elif(event['attack_name'] == "FGM"):
        message = "test acc on FGM adversarial examples (%): {:.3f}".format(test_acc_fgsm.result() * 100)
    elif(event['attack_name'] == "PGD"):
        message = "test acc on PGD adversarial examples (%): {:.3f}".format(test_acc_pgd.result() * 100)
    elif(event['attack_name'] == "CWL2"):
        message = "test acc on CWL2 adversarial examples (%): {:.3f}".format(test_acc_cw.result() * 100)
    elif(event['attack_name'] == "MIM"):
        message = "test acc on Momentum Iterative Method adversarial examples (%): {:.3f}".format(test_acc_mim.result() * 100)   
    elif(event['attack_name'] == "SPSA"):
        message = "test acc on SPSA adversarial examples (%): {:.3f}".format(test_acc_spsa.result() * 100)   
    
    return { 
        'result: ' : message
    } 