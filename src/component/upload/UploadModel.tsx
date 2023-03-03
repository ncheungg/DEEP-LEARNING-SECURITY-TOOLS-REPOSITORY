import React from "react";
import { CloudSyncOutlined, CloudUploadOutlined, DatabaseOutlined, FileMarkdownOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

//const { Storage } = require("@google-cloud/storage");
//const gc = new Storage({
//   keyFilename: "./credible-tesla-375823-3923de5f4106.json",
//   projectId: "credible-tesla-375823",
// });
// gc.getBuckets().then((x: any) => console.log(x));



const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  accept: "zip",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    const file = e.dataTransfer.files[0];
    const formData = new FormData();
    formData.append('file', file);
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

const UploadModel: React.FC = () => {
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
      <br />
      <br />
      <br />
    </Dragger>
  );
};

export default UploadModel;
