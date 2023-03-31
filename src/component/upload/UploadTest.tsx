import React, { useState } from "react";
import { DatabaseOutlined, FileZipOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Space, Spin } from "antd";
import { useSetRecoilState } from "recoil";
import { datasetNameState } from "@/recoil/Atom";

const { Dragger } = Upload;

const UploadTest: React.FC = () => {
  const setDatasetName = useSetRecoilState(datasetNameState);

  const props: UploadProps = {
    name: "dataset",
    multiple: false,
    accept: ".zip",
    maxCount: 1,
    action: "https://upload-file-zvax3lpy2q-ue.a.run.app",

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
        setDatasetName(info.file.name.slice(0, -4));
        return;
      }
      if (status === "error") {
        message.error(
          <>
            {info.file.name} dataset upload failed. <br />
            See&nbsp;
            <a href="https://www.tensorflow.org/datasets" target="_blank" rel="noopener noreferrer">
              https://www.tensorflow.org/datasets
            </a>
            &nbsp;for more information on the TensorFlow Datasets format.
          </>,
          10
        );
        return;
      }
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
        <FileZipOutlined />
      </p>
      <p className="ant-upload-text">Click or drag to upload model dataset here</p>
      <p className="ant-upload-hint">Compressed (.zip) file containing test data in the TensorFlow-Datasets format</p>
      <br />
      <br />
      <br />
      <br />
      <br />
    </Dragger>
  );
};

export default UploadTest;
