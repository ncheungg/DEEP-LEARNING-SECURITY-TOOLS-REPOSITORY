import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Input, Radio, Row, Tooltip } from "antd";
import { useState } from "react";

interface AttackProps {
  formEnabled: boolean;
  sliderVal: [number, number];
  epsilonStep?: number;
  attackIterations?: number;
}

const MomentumIterativeMethodAttack = (props: AttackProps) => {
  const { formEnabled } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);
  const [decayFactor, setDecayFactor] = useState<number>();

  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>Momentum Iterative Method Attack</b>
      </Checkbox>
      <Tooltip title="Click for Momentum Iterative Method Attack Documentation">
        <a href="/about#cleverhans-momentum-iterative-method-attack" target="_blank" rel="noreferrer noopener">
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
          label="Decay Factor:"
          required={subFormEnabled}
          rules={[{ required: true, message: "Please enter the decay factor for momentum term." }]}
          tooltip="The decay factor for momentum term."
        >
          <Input type="number" onChange={(e) => setDecayFactor(Number(e.target.value))} />
        </Form.Item>
      </Form>
    </>
  );
};

export default MomentumIterativeMethodAttack;
