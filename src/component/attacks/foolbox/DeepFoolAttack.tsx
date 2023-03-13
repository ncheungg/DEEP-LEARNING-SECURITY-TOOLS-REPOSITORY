import { FileSearchOutlined, InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Row, Tooltip } from "antd";
import { useState } from "react";

interface AttackProps {
  formEnabled: boolean;
  formRef: React.MutableRefObject<null>;
  sliderVal: [number, number];
  lowerBound?: number;
  upperBound?: number;
}

const DeepFoolAttack = (props: AttackProps) => {
  const { formEnabled, formRef, sliderVal, lowerBound, upperBound } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);

  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>Deep Fool Attack</b>
      </Checkbox>
      <Tooltip title="A simple and fast gradient-based adversarial attack. Implements the DeepFool attack. (Click for Deep Fool Attack Documentation)">
        <a href="/about#foolbox-deep-fool-attack" target="_blank" rel="noreferrer noopener">
          <InfoCircleOutlined style={{ color: "gray" }} />
        </a>
      </Tooltip>

      {/* attack inputs */}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        disabled={!subFormEnabled || !formEnabled}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={formRef}
      >
        <Form.Item
          tooltip="Order of the Norm Definition: A vectors norm is another way to refer to its length. L1, L2, and Linf are 3 different ways to calculate a vectors length. L1 norm is calculated as the sum of the absolute vector values from the origin (Manhattan distance). L2 norm is calculated by determining the distance of the vector from the origin (Euclidean distance). Linf norm is calculated by returning the max value of the vector."
          label="Order of the Norm:"
          required={subFormEnabled}
          rules={[{ required: true, message: "Please input Order of the Norm Value." }]}
        >
          <Checkbox.Group style={{ width: "100%" }}>
            <Checkbox value="B">2</Checkbox>
            <Checkbox value="C">∞</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default DeepFoolAttack;
