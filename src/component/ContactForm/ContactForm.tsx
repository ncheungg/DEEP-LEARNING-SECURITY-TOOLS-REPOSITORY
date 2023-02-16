import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

type MySizeType = "small" | "medium" | "large";

interface MyComponentProps {
  size?: MySizeType;
}

const ContactForm: React.FC = () => {
  const [componentSize, setComponentSize] = useState<MySizeType | "default">("default");
  const [form] = Form.useForm();

  const onFormLayoutChange = ({ size }: { size: MySizeType }) => {
    setComponentSize(size);
  };

  const handleSubmit = (values: any) => {
    console.log("Form values: ", values);
    success();
    form.resetFields();
  };

  const handleError = (values: any) => {
    const missingValues = Object.keys(values).filter((key) => !values[key]);
    if (missingValues.length) {
      console.error(`The following fields are required: ${missingValues.join(", ")}`);
      message.error(`Please fill in all required fields.`);
      return;
    }

    console.log("Form values: ", values);
    success();
    form.resetFields();
  };
  const [messageApi, contextHolder] = message.useMessage();

  const validateMessages = {
    required: "${name} required!",
    types: {
      email: "Please Enter a Valid email",
    },
  };
  // const handleError = (error: any) => {
  //   messageApi.open({
  //     type: "error",
  //     content: "Please fill out all required fields",
  //   });
  // };

  const success = () => {
    window.scrollTo(0, 0);
    messageApi.open({
      type: "success",
      content: "Thank you for contacting us! We will reach out to you in 2-3 business days.",
    });
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 35 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      //size={componentSize as MySizeType}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      onFinish={handleSubmit}
      //onFinish={handleError}
    >
      <Form.Item name={["Name"]} label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter a valid name" />
      </Form.Item>
      <Form.Item name={["Email"]} label="Email" rules={[{ type: "email", required: true }]}>
        <Input placeholder="Enter a valid email address" />
      </Form.Item>
      <Form.Item name={["A message is"]} label="Message" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Your message " />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 2, offset: 12 }}>
        <>
          {contextHolder}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
