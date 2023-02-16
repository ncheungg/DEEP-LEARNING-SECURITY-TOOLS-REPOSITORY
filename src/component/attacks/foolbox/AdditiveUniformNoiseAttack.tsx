import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Radio, Row, Tooltip } from "antd";
import { useState } from "react";

interface AttackProps {
  formEnabled: boolean;
  sliderVal: [number, number];
  lowerBound?: number;
  upperBound?: number;
}

const AdditiveUniformNoiseAttack = (props: AttackProps) => {
  const { formEnabled } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);
  const [selectedNorms, setSelectedNorms] = useState(new Set());

  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>Additive Uniform Noise Attack</b>
      </Checkbox>
      <Tooltip title="Samples uniform noise with or without repeated/clipping.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>

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
          label="Order of the Norm:"
          rules={[{ required: true, message: "Please input Order of the Norm Value." }]}
          required={subFormEnabled}
          tooltip="Order of the Norm Definition: A vectors norm is another way to refer to its length. L1, L2, and Linf are 3 different ways to calculate a vectors length. L1 norm is calculated as the sum of the absolute vector values from the origin (Manhattan distance). L2 norm is calculated by determining the distance of the vector from the origin (Euclidean distance). Linf norm is calculated by returning the max value of the vector."
        >
          <Checkbox.Group style={{ width: "100%" }}>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="inf">∞</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          label="Attack Types:"
          rules={[{ required: true, message: "Please input desired attack types." }]}
          required={subFormEnabled}
          tooltip="Samples Uniform noise with or without repeated/clipping."
          style={{ marginTop: "-2em" }}
        >
          <Checkbox.Group style={{ width: "100%" }}>
            <Checkbox value="additive">Additive</Checkbox>
            <Checkbox value="clipping-aware-additive">Clipping</Checkbox>
            <Checkbox value="repeated-additive">Repeated</Checkbox>
            <Checkbox value="clipping-aware-repeated-additive">Clipping & Repeated</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdditiveUniformNoiseAttack;
