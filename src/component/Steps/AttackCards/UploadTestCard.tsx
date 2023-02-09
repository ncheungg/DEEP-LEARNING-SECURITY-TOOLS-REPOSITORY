import UploadTest from "@/component/upload/UploadTest";
import { Card } from "antd";
import React from "react";

const UploadTestCard: React.FC = () => (
  <Card title="Upload your test file" bordered={false} style={{ width: 824, height: 550 }}>
    <UploadTest />
  </Card>
);

export default UploadTestCard;
