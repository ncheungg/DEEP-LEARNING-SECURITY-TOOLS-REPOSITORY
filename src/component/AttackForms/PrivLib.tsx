import React, { useState } from "react";
import { DownOutlined, InfoCircleOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
import { Collapse } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "ML Privacy Meter",
    children: [
      {
        key: "1-1",
        label: "Population Attack",
      },
      // {
      //   key: "1-2",
      //   label: "4th menu item",
      // },
    ],
  },
  // {
  //   key: "3",
  //   label: "disabled sub menu",
  //   disabled: true,
  //   children: [
  //     {
  //       key: "3-1",
  //       label: "5d menu item",
  //     },
  //     {
  //       key: "3-2",
  //       label: "6th menu item",
  //     },
  //   ],
  // },
];

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

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

const PrivLib: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  PrivLib.displayName = "FastGradientForm";

  return (
    <div style={{ paddingBottom: "1.3em" }}>
      <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>Enable Privacy Meter</b>
      </Checkbox>
      <Dropdown menu={{ items }}>
        <a style={{ color: "gray" }} onClick={(e) => e.preventDefault()}>
          <Space>
            {/* Cascading menu */}
            <PlusCircleOutlined />
          </Space>
        </a>
      </Dropdown>
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
              <Tooltip placement="right" title="Description: Number of classes that the input can be labelled as.">
                <InfoCircleOutlined style={{ color: "gray" }} />
              </Tooltip>
            }
          />
        </Form.Item>

        <Form.Item label="Loss Function:" rules={[{ required: true, message: "Please input Order of the Norm value." }]}>
          <Row>
            <Col span={6} style={{ paddingRight: "2em" }}>
              <Space wrap>
                <Select
                  defaultValue="Select"
                  style={{ width: 230 }}
                  onChange={handleChange}
                  options={[
                    { value: "bin_cross", label: "Binary Crossentropy" },
                    { value: "cat_cross", label: "Categorical Crossentropy" },
                    { value: "mean_abs", label: "Mean Absolute Error" },
                    { value: "mean_sq", label: "Mean Squared Error" },
                  ]}
                />
              </Space>
            </Col>
            <Col span={1}>
              <Tooltip placement="right" title="Description: Loss function used by ML Privacy Meter to perform audit.">
                <InfoCircleOutlined style={{ color: "gray", paddingLeft: "10.5em", paddingTop: "0.56em" }} />
              </Tooltip>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PrivLib;
