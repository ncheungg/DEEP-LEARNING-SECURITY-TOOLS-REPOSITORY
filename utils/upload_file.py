import functions_framework
import io
import zipfile
from google.cloud import storage
import os
import tempfile
import logging
import json

bucket_name = "dlstr-bucket"
dataset_files = ['dataset_info.json', 'features.json', 'label.labels.txt']
model_files = ['.pb', '.index', '.data-00000-of-00001']


@functions_framework.http
def upload_file(request):
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600'
        }

        return '', 204, headers

    headers = {
            'Access-Control-Allow-Origin': '*'
        }

    model_dataset = True

    if 'model' in request.files:
        file = request.files['model']
    elif 'dataset' in request.files:
        file = request.files['dataset']
        model_dataset = False
    else:
        return ('No file uploaded', 400, headers)

    if not file.filename.endswith('.zip'):
        return ('Not a zip file', 400, headers)

    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)

    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        file.save(tmp_file.name)
        with zipfile.ZipFile(tmp_file.name, 'r') as zip_ref:
            zip_ref.extractall(f'/tmp/{file.filename}')
        # Get the name of the unzipped folder
        unzipped_folder_name = zip_ref.namelist()[0].split("/")[0]
        print(unzipped_folder_name)
        # Copy the unzipped files to the same bucket
        
        for file_name in zip_ref.namelist():
            if os.path.isfile(f'/tmp/{file.filename}/{file_name}'):

                if model_dataset:
                    if not file_name.endswith(tuple(model_files)):
                        print(file_name)
                        return ("Inputted model is not is the right format, see https://www.tensorflow.org/guide/saved_model", 400, headers)
                else:
                    if not file_name.endswith(tuple(dataset_files)) and ".tfrecord" not in file_name:
                        print(file_name)
                        return ("Inputted dataset is not in the right format, see https://www.tensorflow.org/datasets", 400, headers)

                unzipped_blob = bucket.blob(file_name)
                unzipped_blob.upload_from_filename(f'/tmp/{file.filename}/{file_name}')
            
        # Delete the temporary file
        os.unlink(tmp_file.name)


    data = {"message" : f"{tmp_file.name} uploaded successfuly"}
  
    # Set CORS headers for the main request
    headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }

    return (json.dumps(data), 200, headers)