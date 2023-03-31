import UploadModel from "@/component/upload/UploadModel";
import { Card } from "antd";
import React from "react";

const UploadModelCard: React.FC = () => (
  <Card title="Upload your Tensorflow SavedModel format model below" bordered={false} style={{ width: "100%", height: 550 }}>
    <UploadModel />
  </Card>
);

export default UploadModelCard;
