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
  Row,
  Col,
  Dropdown,
  Space,
  Slider,
} from "antd";
import { Tooltip } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "CleverHans",
    children: [
      {
        key: "1-1",
        label: "Basic Iterative Attack",
      },
      {
        key: "1-2",
        label: "Fast Gradient Attack",
      },
      {
        key: "1-3",
        label: "Madry et al Attack",
      },
      {
        key: "1-4",
        label: "Momentum Iterative Attack",
      },
      {
        key: "1-5",
        label: "SPSA",
      },
      {
        key: "1-6",
        label: "Projected Gradient Descent Attack",
      },
    ],
  },
  {
    key: "2",
    label: "Foolbox",
    children: [
      {
        key: "2-1",
        label: "Projected Gradient Descent Attack",
      },
      {
        key: "2-2",
        label: "Basic Iterative Attack",
      },
      {
        key: "2-3",
        label: "Contrast Reduction Attack",
      },
      {
        key: "2-4",
        label: "Fast Gradient Attack",
      },
      {
        key: "2-5",
        label: "Additive Gaussian Noise Attack",
      },
      {
        key: "2-6",
        label: "Inversion Attack",
      },
      {
        key: "2-7",
        label: "Salt and Pepper Noise Attack",
      },
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

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log("checked = ", checkedValues);
};

const AdvLib: React.FC = () => {
  // enable/disable form checkbox
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  // // for order of the norm checkbox (front -> back)
  // const [normVal, setNormVal] = useState([0, 0.5]);
  // const onSliderChange = (value: any) => {
  //   console.log(value);
  // };

  // for slider values (front -> back)
  const [sliderVal, setSliderVal] = useState([0, 0.5]);
  const onSliderChange = (value: any) => {
    console.log(value);
  };

  AdvLib.displayName = "MomentumIterativeForm";

  return (
    <>
      <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>Enable Adversarial Example Attack Libraries</b>
      </Checkbox>
      <Dropdown menu={{ items }}>
        <a style={{ color: "gray" }} onClick={(e) => e.preventDefault()}>
          <Space>
            {/* Cascading menu */}
            <PlusCircleOutlined />
          </Space>
        </a>
      </Dropdown>
      {/* <Tooltip
        placement="right"
        title="Attacks available within this library:
        \n- Cleverhans...
        - FoolBox"
      >
        <PlusCircleOutlined style={{ color: "gray" }} />
      </Tooltip> */}
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
        <Form.Item label="Epsilon:" rules={[{ required: true, message: "Please input Epsilon value." }]}>
          <Slider range defaultValue={[0, 0.5]} disabled={!componentDisabled} onChange={onSliderChange} step={0.02} />
        </Form.Item>

        <Form.Item label="Epsilon Step Size:" rules={[{ required: true, message: "Please input Epsilon value." }]}>
          <Slider range defaultValue={[20, 50]} disabled={!componentDisabled} />
        </Form.Item>

        {/* <Form.Item label="Epsilon:" rules={[{ required: true, message: "Please input Epsilon value." }]}>
          <Input
            suffix={
              <Tooltip
                placement="right"
                title="Epsilon Definition: The maximum distortion of adversarial example compared to original input."
              >
                <InfoCircleOutlined style={{ color: "gray" }} />
              </Tooltip>
            }
          />
        </Form.Item> */}

        {/* <Form.Item label="Epsilon Step Size:" rules={[{ required: true, message: "Please input Epsilon Step Size value." }]}>
          <Input
            suffix={
              <Tooltip placement="right" title="Epsilon Step Size Definition: The step size for epsilon for each attack iteration.">
                <InfoCircleOutlined style={{ color: "gray" }} />
              </Tooltip>
            }
          />
        </Form.Item> */}

        <Form.Item label="Attack Iterations:" rules={[{ required: true, message: "Please input Attack Iterations value." }]}>
          <Input
            suffix={
              <Tooltip placement="right" title="Attack Iterations Definition: The number of attack iterations.">
                <InfoCircleOutlined style={{ color: "gray" }} />
              </Tooltip>
            }
          />
        </Form.Item>

        <Form.Item label="Order of the Norm:" rules={[{ required: true, message: "Please input Order of the Norm Value." }]}>
          <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
            <Row>
              <Col span={4} style={{ paddingRight: "3em" }}>
                <Checkbox value="A">0</Checkbox>
              </Col>
              <Col span={4} style={{ paddingRight: "3em" }}>
                <Checkbox value="A">1</Checkbox>
              </Col>
              <Col span={4} style={{ paddingRight: "3em" }}>
                <Checkbox value="B">2</Checkbox>
              </Col>
              <Col span={4} style={{ paddingRight: "3em" }}>
                <Checkbox value="C">∞</Checkbox>
              </Col>
              <Col span={4}>
                <Tooltip
                  placement="right"
                  title="Order of the Norm Definition: A vectors norm is another way to refer to its length. L1, L2, and Linf are 3 different ways to calculate a vectors length. L1 norm is calculated as the sum of the absolute vector values from the origin (Manhattan distance). L2 norm is calculated by determining the distance of the vector from the origin (Euclidean distance). Linf norm is calculated by returning the max value of the vector."
                >
                  <InfoCircleOutlined style={{ color: "gray" }} />
                </Tooltip>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="Decay Factor:">
          <Input
            suffix={
              <Tooltip placement="right" title="Decay Factor Definition: The decay factor for momentum term.">
                <InfoCircleOutlined style={{ color: "gray" }} />
              </Tooltip>
            }
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default AdvLib;
