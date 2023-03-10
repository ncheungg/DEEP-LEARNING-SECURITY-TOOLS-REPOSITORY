import React, { useState } from "react";
import { CloudSyncOutlined, CloudUploadOutlined, DatabaseOutlined, FileMarkdownOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

import {Space, Spin } from 'antd';

//const { Storage } = require("@google-cloud/storage");
//const gc = new Storage({
//   keyFilename: "./credible-tesla-375823-3923de5f4106.json",
//   projectId: "credible-tesla-375823",
// });
// gc.getBuckets().then((x: any) => console.log(x));



const { Dragger } = Upload;


const UploadModel: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: "zip",
    maxCount: 1,
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
        setLoading(true);
        return;
      }
      if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        return;
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
          setLoading(false);
          message.success(`${info.file.name} file uploaded successfully.`);
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


  return (
    <Dragger {...props} style={{ width: "100%" }}>
      <p className="ant-upload-drag-icon">
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* <InboxOutlined /> */}
        {/* <CloudSyncOutlined /> */}
        {/* <CloudUploadOutlined /> */}
        <FileMarkdownOutlined />
      </p>
      <p className="ant-upload-text">Click or drag to upload keras model here</p>
      <p className="ant-upload-hint">Compressed (.zip) file containing a Keras model in the Tensorflow SavedModel format</p>
      <br />
      <br />
      <br />
      
      <Space direction="vertical" style={{ width: '100%', height: 40 }}>
        
        {loading && (
          <Spin tip="Uploading File...">
            <div style={{ height: 40 }}></div>
          </Spin>
        )}
        
      </Space>
      
      <br />
      <br />
      
      
      
      
    </Dragger>
  );
};

export default UploadModel;
