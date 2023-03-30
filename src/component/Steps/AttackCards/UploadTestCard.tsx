import UploadTest from "@/component/upload/UploadTest";
import { Card } from "antd";
import React from "react";

const UploadTestCard: React.FC = () => (
  <Card title="Upload your Tensorflow-Datasets format dataset below" bordered={false} style={{ width: "100%", height: 550 }}>
    <UploadTest />
  </Card>
);

export default UploadTestCard;
