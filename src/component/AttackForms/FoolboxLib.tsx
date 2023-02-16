import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox, Slider } from "antd";
import { Tooltip } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import type { MenuProps } from "antd";
import DeepFoolAttack from "../attacks/foolbox/DeepFoolAttack";
import FastGradientAttack from "../attacks/foolbox/FastGradientAttack";
import BasicIterativeAttack from "../attacks/foolbox/BasicIterativeAttack";
import AdditiveGaussianNoiseAttack from "../attacks/foolbox/AdditiveGaussianNoiseAttack";
import AdditiveUniformNoiseAttack from "../attacks/foolbox/AdditiveUniformNoiseAttack";
import InversionAttack from "../attacks/foolbox/InversionAttack";
import SaltAndPepperNoiseAttack from "../attacks/foolbox/SaltAndPepperNoiseAttack";
import ContrastReductionAttack from "../attacks/foolbox/ContrastReductionAttack";

const SLIDER_STEP = 0.02;

const FoolboxLib: React.FC = () => {
  // enable/disable form checkbox
  const [componentEnabled, setComponentEnabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentEnabled(disabled);
  };

  const [sliderVal, setSliderVal] = useState<[number, number]>([0, 0.5]);
  const [lowerBound, setLowerBound] = useState<number>();
  const [upperBound, setUpperBound] = useState<number>();

  return (
    <>
      <Checkbox checked={componentEnabled} onChange={(e) => setComponentEnabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>Enable Foolbox</b>
      </Checkbox>

      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={!componentEnabled}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Epsilons:" required rules={[{ required: true, message: "Please input epsilon values." }]}>
          <Slider
            range
            defaultValue={[0, 0.2]}
            disabled={!componentEnabled}
            onChange={(val) => setSliderVal(val)}
            step={SLIDER_STEP}
            max={0.5}
          />
        </Form.Item>

        <Form.Item label="Model Lower Bound:" required rules={[{ required: true, message: "Please input the model's lower bound value." }]}>
          <Input type="number" placeholder="0" onChange={(e) => setLowerBound(Number(e.target.value))} />
        </Form.Item>

        <Form.Item label="Model Upper Bound:" required rules={[{ required: true, message: "Please input the model's upper bound value." }]}>
          <Input type="number" placeholder="255" onChange={(e) => setUpperBound(Number(e.target.value))} />
        </Form.Item>

        <div style={{ textAlign: "left", marginTop: "5em" }}>
          <DeepFoolAttack formEnabled={componentEnabled} {...{ sliderVal, lowerBound, upperBound }} />
          <FastGradientAttack formEnabled={componentEnabled} {...{ sliderVal, lowerBound, upperBound }} />
          <BasicIterativeAttack formEnabled={componentEnabled} {...{ sliderVal, lowerBound, upperBound }} />
          <AdditiveGaussianNoiseAttack formEnabled={componentEnabled} {...{ sliderVal, lowerBound, upperBound }} />
          <AdditiveUniformNoiseAttack formEnabled={componentEnabled} {...{ sliderVal, lowerBound, upperBound }} />
          <InversionAttack formEnabled={componentEnabled} {...{ sliderVal, lowerBound, upperBound }} />
          <SaltAndPepperNoiseAttack formEnabled={componentEnabled} {...{ sliderVal, lowerBound, upperBound }} />
          <ContrastReductionAttack formEnabled={componentEnabled} {...{ sliderVal, lowerBound, upperBound }} />
        </div>
      </Form>
    </>
  );
};

export default FoolboxLib;