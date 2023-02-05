import React, { useState } from "react";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Row,
  Col,
} from "antd";
import { Tooltip } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log("checked = ", checkedValues);
};

const MadryetalForm: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  MadryetalForm.displayName = "MadryetalForm";

  return (
    <>
      <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>Madry Et Al Method Attack</b>
      </Checkbox>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={!componentDisabled}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Epsilon:">
          <Input
            suffix={
              <Tooltip title="Epsilon Definition: The maximum distortion of adversarial example compared to original input.">
                <InfoCircleOutlined style={{ color: "gray" }} />
              </Tooltip>
            }
          />
        </Form.Item>

        <Form.Item label="Epsilon Step Size:">
          <Input
            suffix={
              <Tooltip title="Epsilon Step Size Definition: The step size for epsilon for each attack iteration.">
                <InfoCircleOutlined style={{ color: "gray" }} />
              </Tooltip>
            }
          />
        </Form.Item>

        <Form.Item label="Attack Iterations:">
          <Input
            suffix={
              <Tooltip title="Attack Iterations Definition: The number of attack iterations.">
                <InfoCircleOutlined style={{ color: "gray" }} />
              </Tooltip>
            }
          />
        </Form.Item>

        <Form.Item label="Order of the Norm:" rules={[{ required: true, message: "Please input Order of the Norm Value." }]}>
          <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
            <Row>
              <Col span={6} style={{ paddingRight: "2em" }}>
                <Checkbox value="A">1</Checkbox>
              </Col>
              <Col span={6} style={{ paddingRight: "2em" }}>
                <Checkbox value="B">2</Checkbox>
              </Col>
              <Col span={6} style={{ paddingRight: "2em" }}>
                <Checkbox value="C">∞</Checkbox>
              </Col>
              <Col span={6}>
                <Tooltip title="Order of the Norm Definition: A vectors norm is another way to refer to its length. L1, L2, and Linf are 3 different ways to calculate a vectors length. L1 norm is calculated as the sum of the absolute vector values from the origin (Manhattan distance). L2 norm is calculated by determining the distance of the vector from the origin (Euclidean distance). Linf norm is calculated by returning the max value of the vector.">
                  <InfoCircleOutlined style={{ color: "gray" }} />
                </Tooltip>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default MadryetalForm;
