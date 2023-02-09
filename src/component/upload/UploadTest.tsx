import React from "react";
import { DatabaseOutlined, FileZipOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
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
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const UploadTest: React.FC = (props) => {
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        {/* <InboxOutlined /> */}
        {/* <DatabaseOutlined /> */}
        <FileZipOutlined />
      </p>
      <p className="ant-upload-text">Click or drag to upload test data here</p>
      <p className="ant-upload-hint">Single file uploads of up to 500MB supported</p>
    </Dragger>
  );
};

export default UploadTest;
