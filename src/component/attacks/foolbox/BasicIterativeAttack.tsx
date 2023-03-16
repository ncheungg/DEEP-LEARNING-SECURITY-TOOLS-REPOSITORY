import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Radio, Row, Tooltip } from "antd";
import { useState } from "react";

interface AttackProps {
  formEnabled: boolean;
  sliderVal: [number, number];
  lowerBound?: number;
  upperBound?: number;
}

const BasicIterativeAttack = (props: AttackProps) => {
  const { formEnabled } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);
  const [randomStart, setRandomStart] = useState(false);

  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>Basic Iterative Attack</b>
      </Checkbox>
      <Tooltip title="Basic Iterative Method. (Click for Basic Iterative Method Attack Documentation)">
        <a href="/documentation#foolbox-basic-iterative-attack" target="_blank" rel="noreferrer noopener">
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
          label="Random Start:"
          rules={[{ required: true, message: "Please input random start." }]}
          required={subFormEnabled}
          tooltip="Controls whether to randomly start within allowed epsilon ball."
          style={{ marginTop: "-2em" }}
        >
          <Radio.Group value={randomStart} onChange={(e) => setRandomStart(e.target.value)}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default BasicIterativeAttack;
