import functions_framework
import io
import zipfile
from google.cloud import storage
import os

# Triggered by a change in a storage bucket
@functions_framework.cloud_event
def unzip_and_upload(cloud_event):
    event = cloud_event.data
    bucket_name = event['bucket']
    file_name = event['name']

    if not file_name.endswith('.zip'):
        print(f'The file {file_name} is not a zip file. Skipping...')
        return
    
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    zip_blob = bucket.blob(file_name)

    zip_data = io.BytesIO()
    zip_blob.download_to_file(zip_data)
    # Seek to the beginning of the file-like object
    zip_data.seek(0)
    
    with zipfile.ZipFile(zip_data, 'r') as zip_ref:
        zip_ref.extractall(f'/tmp/{file_name.split(".")[0]}')
    # Get the name of the unzipped folder
    unzipped_folder_name = zip_ref.namelist()[0]

    # Copy the unzipped files to the same bucket
    for file_name in zip_ref.namelist():
        if os.path.isfile(f'/tmp/{unzipped_folder_name}/{file_name}'):
            unzipped_blob = bucket.blob(file_name)
            unzipped_blob.upload_from_filename(f'/tmp/{unzipped_folder_name}/{file_name}')
   
    # Delete the zip file
    zip_blob.delete()