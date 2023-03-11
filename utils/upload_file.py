import functions_framework
import io
import zipfile
from google.cloud import storage
import os
import tempfile
import logging
import json

bucket_name = "dlstr-bucket"

@functions_framework.http
def upload_file(request):
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return '', 204, headers

    if 'file' not in request.files:
        return 'No file uploaded', 400

    file = request.files['file']

    # Save the file to a temporary file on disk
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        file.save(tmp_file.name)
        
        storage_client = storage.Client()
        # Upload the file to Google Cloud Storage
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(file.filename)
        with open(tmp_file.name, 'rb') as f:
            blob.upload_from_file(f)
            
        # Delete the temporary file
        os.unlink(tmp_file.name)


    data = {"message" : f"{tmp_file.name} uploaded successfuly"}
  
    # Set CORS headers for the main request
    headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }

    return (json.dumps(data), 200, headers)