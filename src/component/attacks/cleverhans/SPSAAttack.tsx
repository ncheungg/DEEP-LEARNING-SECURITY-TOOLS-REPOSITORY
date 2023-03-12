import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Input, Radio, Row, Tooltip } from "antd";
import { useState } from "react";

interface AttackProps {
  formEnabled: boolean;
  sliderVal: [number, number];
  epsilonStep?: number;
  attackIterations?: number;
}

const SPSAAttack = (props: AttackProps) => {
  const { formEnabled } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);
  const [lowerBound, setLowerBound] = useState<number>();
  const [upperBound, setUpperBound] = useState<number>();

  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>SPSA Attack</b>
      </Checkbox>
      <Tooltip title="Click for SPSA Attack Documentation">
        <a href="/documentation#cleverhans-spsa-attack" target="_blank" rel="noreferrer noopener">
          <InfoCircleOutlined style={{ color: "gray" }} />
        </a>
      </Tooltip>

      {/* attack inputs */}
      <Form
        labelCol={{ span: 8 }}
        // wrapperCol={{ span: 20 }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        disabled={!subFormEnabled || !formEnabled}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Model Lower Bound"
          required={subFormEnabled}
          rules={[{ required: true, message: "Please input the model's lower bound value." }]}
          tooltip="The lower bound for the model's pixel values, usually (0, 1) or (0, 255)."
        >
          <Input type="number" placeholder="0" onChange={(e) => setLowerBound(Number(e.target.value))} />
        </Form.Item>

        <Form.Item
          label="Model Upper Bound"
          required={subFormEnabled}
          rules={[{ required: true, message: "Please input the model's upper bound value." }]}
          tooltip="The upper bound for the model's pixel values, usually (0, 1) or (0, 255)."
        >
          <Input type="number" placeholder="255" onChange={(e) => setLowerBound(Number(e.target.value))} />
        </Form.Item>
      </Form>
    </>
  );
};

export default SPSAAttack;
