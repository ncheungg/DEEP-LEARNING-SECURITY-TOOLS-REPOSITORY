import React, { useState } from "react";
import { CloudSyncOutlined, CloudUploadOutlined, DatabaseOutlined, FileMarkdownOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

import {Space, Spin } from 'antd';

const { Dragger } = Upload;


const UploadModel: React.FC = () => {

  const props: UploadProps = {
    name: "model",
    multiple: false,
    accept: ".zip",
    maxCount: 1,
    action: 'https://upload-file-zvax3lpy2q-ue.a.run.app',

    onChange(info) {
      //on change occurs anytime the status of the upload changes (file added/removed, upload finished)

      const { file } = info;
      const status = file.status;

      if (status === "removed") {
        console.log("file remove");
        return;
      }
      //uploading means from users computer to client side
      if (status === "uploading") {
        console.log("uploading file");
        return;
      }
      if (status === "error") {
        message.error(<>{info.file.name} model upload failed. <br />
                      See&nbsp;
                      <a href="https://www.tensorflow.org/guide/saved_model" target="_blank">https://www.tensorflow.org/guide/saved_model</a>
                      &nbsp;for more information on the TensorFlow SavedModel format.</>, 10);
        return;
      }
      
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
        <FileMarkdownOutlined />
      </p>
      <p className="ant-upload-text">Click or drag to upload model here</p>
      <p className="ant-upload-hint">Compressed (.zip) file containing a Keras model in the Tensorflow SavedModel format</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      
    </Dragger>
  );
};

export default UploadModel;
