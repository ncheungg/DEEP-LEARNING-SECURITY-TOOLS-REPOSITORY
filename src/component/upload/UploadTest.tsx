import React from "react";
import { DatabaseOutlined, FileZipOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  accept: "zip",
  onChange(info) {
    //on change occurs anytime the status of the upload changes (file added/removed, upload finished)
    
    const {file} = info;
    const status = file.status;

    if(status === "removed"){
      console.log("file remove");
      return;
    }
    //uploading means from users computer to client side
    if(status == "uploading"){
      return;
    }
    if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      return;
    }

    //once its uploaded to client side, then we can upload through api call
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    }
    
    const formData = new FormData();
    if(file.originFileObj){
      formData.append('file', file.originFileObj);
    }

    console.log("uploading file");
    console.log(formData);
    fetch('https://dlstr-cleverhans-api-gateway-1brzzfaf.ue.gateway.dev/upload-file', {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then((data) => {
      console.log('Upload successful');
      console.log(data);
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
    });

  },

};

const UploadTest: React.FC = () => {
  return (
    <Dragger {...props}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <p className="ant-upload-drag-icon">
        {/* <InboxOutlined /> */}
        {/* <DatabaseOutlined /> */}
        <FileZipOutlined />
      </p>
      <p className="ant-upload-text">Click or drag to upload model dataset here</p>
      <p className="ant-upload-hint">Compressed (.zip) file containing test data in the TensorFlow-Datasets format</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Dragger>
  );
};

export default UploadTest;
