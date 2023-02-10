import React, { useState } from "react";
import {
  Button,
  message,
  Space,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Layout,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Typography,
} from "antd";
import { type } from "os";

type SizeType = Parameters<typeof Form>[0]["size"];

const ContactForm: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">("default");

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const [messageApi, contextHolder] = message.useMessage();

  const validateMessages = {
    required: "${name} required!",
    types: {
      email: "Please Enter a Valid email",
    },
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });

    console.log("pressed");
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  return (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 35 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
    >
      <Form.Item name={["Name"]} label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter a valid name" />
      </Form.Item>
      <Form.Item name={["Email"]} label="Email" rules={[{ type: "email", required: true }]}>
        <Input placeholder="Enter a valid email address" />
      </Form.Item>
      <Form.Item name={["user", "introduction"]} label="Message">
        <Input.TextArea placeholder="Your message " />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 2, offset: 12 }}>
        <>
          {contextHolder}
          {/* <Button type="primary" onClick={htmltype = "submit" ? success : () => {}}> */}
          <Button type="primary" htmlType="submit" onClick={success}>
            Submit
          </Button>
        </>
      </Form.Item>
      {/* <Form.Item label="Name">
        <Input />
      </Form.Item>
      <Form.Item label="Email">
        <Input />
      </Form.Item>
      <Form.Item label="Message">
        <Input />
      </Form.Item>

      <Form.Item label="Send">
        <Button>Submit</Button>
      </Form.Item> */}
    </Form>
  );
};

export default ContactForm;
