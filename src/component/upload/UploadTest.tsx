import React, { useState } from "react";
import { DatabaseOutlined, FileZipOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import {Space, Spin } from 'antd';


const { Dragger } = Upload;

const UploadTest: React.FC = () => {
  
  const [loading, setLoading] = useState(false);


  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: "zip",
    maxCount: 1,
    //progress: { strokeWidth: 4, showInfo: true },
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

export default UploadTest;
