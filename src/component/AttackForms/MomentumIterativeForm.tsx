import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, Checkbox, Upload } from "antd";
import { Tooltip } from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const MomentumIterativeForm: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  return (
    <>
      <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>Momentum Iterative Method Attack</b>
      </Checkbox>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
      >
        <Tooltip title="Epsilon Definition: The maximum distortion of adversarial example compared to original input.">
          <Form.Item label="Epsilon:">
            <Input />
          </Form.Item>
        </Tooltip>
        <Tooltip title="Epsilon Step Size Definition: The step size for epsilon for each attack iteration.">
          <Form.Item label="Epsilon Step Size:">
            <Input />
          </Form.Item>
        </Tooltip>
        <Tooltip title="Attack Iterations Definition: The number of attack iterations.">
          <Form.Item label="Attack Iterations:">
            <Input />
          </Form.Item>
        </Tooltip>
        <Tooltip title="Order of the Norm Definition: A vectors norm is another way to refer to its length. L1, L2, and Linf are 3 different ways to calculate a vectors length. L1 norm is calculated as the sum of the absolute vector values from the origin (Manhattan distance). L2 norm is calculated by determining the distance of the vector from the origin (Euclidean distance). Linf norm is calculated by returning the max value of the vector.">
          <Form.Item label="Order of the Norm:">
            <Radio.Group>
              <Radio value="1"> 1 </Radio>
              <Radio value="2"> 2 </Radio>
              <Radio value="∞"> ∞ </Radio>
            </Radio.Group>
          </Form.Item>
        </Tooltip>
        <Tooltip title="Decay Factor Definition: The decay factor for momentum term.">
          <Form.Item label="Decay Factor:">
            <Input />
          </Form.Item>
        </Tooltip>
      </Form>
    </>
  );
};

export default () => <MomentumIterativeForm />;
