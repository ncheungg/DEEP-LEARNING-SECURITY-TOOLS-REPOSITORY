import React, { useState } from "react";
import { CloudSyncOutlined, PlayCircleFilled, PoweroffOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

const FormSubmitBtn: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <Space direction="vertical">
      <Space wrap>
        <Button type="primary" icon={<PlayCircleFilled />} href="/results" loading={loadings[1]} onClick={() => enterLoading(1)}>
          Scan Model
        </Button>
      </Space>
    </Space>
  );
};

export default FormSubmitBtn;
