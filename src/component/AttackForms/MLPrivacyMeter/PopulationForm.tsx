import React, { useState } from "react";
import { DownOutlined, InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
  Divider,
  Row,
  Col,
  MenuProps,
} from "antd";
import { Tooltip } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Dropdown, Space } from "antd";

const items: MenuProps["items"] = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        Binary Crossentropy
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        Categorical Crossentropy
      </a>
    ),
    key: "1",
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        Mean Absolute Error
      </a>
    ),
    key: "2",
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        Mean Squared Error
      </a>
    ),
    key: "3",
  },
  //   {
  //     type: "divider",
  //   },
];

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CheckboxGroup = Checkbox.Group;

const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log("checked = ", checkedValues);
};

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const PopulationForm: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  PopulationForm.displayName = "FastGradientForm";

  return (
    <div style={{ paddingBottom: "1.3em" }}>
      <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>Fast Gradient Method Attack</b>
      </Checkbox>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={!componentDisabled}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Number of Classes:" rules={[{ required: true, message: "Please input Epsilon value." }]}>
          <Input
            suffix={
              <Tooltip title="Description: Number of classes that the input can be labelled as.">
                <InfoCircleOutlined style={{ color: "gray" }} />
              </Tooltip>
            }
          />
        </Form.Item>

        <Form.Item label="Loss Function:" rules={[{ required: true, message: "Please input Order of the Norm value." }]}>
          <Row>
            <Col span={6} style={{ paddingRight: "2em" }}>
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Nothing Selected
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Col>
            <Col span={6}>
              <Tooltip title="Description: Loss function used by ML Privacy Meter to perform audit.">
                <InfoCircleOutlined style={{ color: "gray" }} />
              </Tooltip>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PopulationForm;
