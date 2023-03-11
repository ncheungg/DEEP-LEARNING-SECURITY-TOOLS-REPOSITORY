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
    file_name_z = event['name']
    print(file_name_z)

    if not file_name_z.endswith('.zip'):
        print(f'The file {file_name_z} is not a zip file. Skipping...')
        return

    # Create a client for interacting with the GCS API
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    zip_blob = bucket.blob(file_name_z)

    # Create an in-memory file-like object
    zip_data = io.BytesIO()

    # Download the file to memory
    zip_blob.download_to_file(zip_data)

    # Seek to the beginning of the file-like object
    zip_data.seek(0)

    # Extract the zip file
    with zipfile.ZipFile(zip_data, 'r') as zip_ref:
        zip_ref.extractall(f'/tmp/{file_name_z.split(".")[0]}')

    # Get the name of the unzipped folder
    unzipped_folder_name = zip_ref.namelist()[0].split("/")[0]
    print(unzipped_folder_name)

    # Copy the unzipped files to the same bucket
    for file_name in zip_ref.namelist():
        print(file_name)
        if os.path.isfile(f'/tmp/{file_name_z.split(".")[0]}/{file_name}'):
            unzipped_blob = bucket.blob(file_name)
            unzipped_blob.upload_from_filename(f'/tmp/{file_name_z.split(".")[0]}/{file_name}')
            
    # Delete the zip file
    zip_blob.delete()