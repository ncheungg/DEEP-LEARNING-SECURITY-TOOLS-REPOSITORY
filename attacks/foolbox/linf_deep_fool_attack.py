import tensorflow as tf
import foolbox as fb
import numpy as np
import matplotlib.pyplot as plt
import tensorflow_datasets as tfds

import shutil
import io
import zipfile

from google.cloud import storage
import functions_framework

# constants
GCP_PROJECT_ID = "silken-campus-375517"
BUCKET_NAME = "capstone-test-bucket"


def download_blob(bucket_name, source_blob_name, destination_folder_name):
    storage_client = storage.Client(project=GCP_PROJECT_ID)

    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    data = io.BytesIO(blob.download_as_string())

    with zipfile.ZipFile(data) as z:
        z.extractall('/tmp/')


@functions_framework.http
def attack_endpoint(request):
    request_json = request.get_json(silent=True)

    model_name = request_json['model_name']
    dataset_name = request_json['dataset_name']

    # load model from gcp bucket
    download_blob(BUCKET_NAME, model_name, model_name[:-4])
    model = tf.keras.models.load_model(f'/tmp/{model_name[:-4]}')

    # remove model from tmp cloud function storage
    shutil.rmtree(f"/tmp/{model_name[:-4]}", ignore_errors=True)

    # load dataset from gcp bucket
    download_blob(BUCKET_NAME, model_name, dataset_name[:-4])
    builder = tfds.builder_from_directory(f'/tmp/{dataset_name[:-4]}')
    dataset = builder.as_dataset(split='test[:2%]', batch_size=128)

    # remove model from tmp cloud function storage
    # shutil.rmtree(f"/tmp/{dataset_name[:-4]}", ignore_errors=True)




def linf_deep_fool_attack(model, model_lower_bound, model_upper_bound, images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.LinfDeepFoolAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)
    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    plt.plot(epsilons, robust_accuracy.numpy())
    plt.ylim(0, 100)

    plt.title("DeepFool L-Infinity Attack")
    plt.xlabel("Epsilons (ε)")
    plt.ylabel("Accuracy (%)")

    plt.show()


if __name__ == "__main__":
    # model = tf.keras.applications.ResNet50V2(weights="imagenet")

    model = tf.keras.models.load_model(r'D:\Nathan\Downloads\test_model')

    builder = tfds.builder_from_directory(r'D:\Nathan\Downloads\cifar10')
    dataset = builder.as_dataset(split='test[:2%]', batch_size=128)

    model_lower_bound = -1
    model_upper_bound = 1
    images, labels = fb.utils.samples(
        fb.TensorFlowModel(model, bounds=(-1, 1), preprocessing=dict()).transform_bounds((0, 1)), dataset='imagenet',
        batchsize=30)
    epsilon_max = 0.01
    epsilon_num = 21

    print(images)

    # linf_deep_fool_attack(model, model_lower_bound, model_upper_bound, images, labels, epsilon_max, epsilon_num)
