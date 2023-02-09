import React, { useState } from "react";
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Layout, Radio, Select, Switch, TreeSelect, Typography } from "antd";

type SizeType = Parameters<typeof Form>[0]["size"];

const ContactForm: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">("default");

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Name">
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
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
