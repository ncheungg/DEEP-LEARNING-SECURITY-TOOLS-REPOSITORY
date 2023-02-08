import React, { useState } from "react";
import { CloudSyncOutlined, PlayCircleFilled, PoweroffOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

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
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Space direction="vertical">
        <Space wrap>
          <Form.Item>
            <Button type="primary" icon={<PlayCircleFilled />} href="/results" loading={loadings[1]} onClick={() => enterLoading(1)}>
              {/* <Button type="primary" htmlType="submit" icon={<PlayCircleFilled />} loading={loadings[1]} onClick={() => enterLoading(1)}> */}
              Scan Model
            </Button>
          </Form.Item>
        </Space>
      </Space>
    </Form>
  );
};

export default FormSubmitBtn;
