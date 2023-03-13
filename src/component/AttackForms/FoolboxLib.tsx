import React, { useState, useRef } from "react";
import { FileSearchOutlined, InfoCircleOutlined } from "@ant-design/icons";
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

interface FoolboxLibProps {
  formRef: React.MutableRefObject<null>;
}

const FoolboxLib = (props: FoolboxLibProps) => {
  const { formRef } = props;

  const deepFoolRef = useRef(null);
  const fastGradientRef = useRef(null);
  const basicIterativeRef = useRef(null);
  const additiveUniformRef = useRef(null);
  const additiveGaussianRef = useRef(null);
  const inversionRef = useRef(null);
  const saltAndPepperRef = useRef(null);
  const contrastReductionRef = useRef(null);

  // enable/disable form checkbox
  const [componentEnabled, setComponentEnabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentEnabled(disabled);
  };

  const [sliderVal, setSliderVal] = useState<[number, number]>([0, 0.5]);
  const [lowerBound, setLowerBound] = useState<number>();
  const [upperBound, setUpperBound] = useState<number>();

  const onFinish = () => {};

  return (
    <>
      <Checkbox checked={componentEnabled} onChange={(e) => setComponentEnabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>Enable Foolbox</b>
      </Checkbox>
      <a href="/about#ml-privacy-meter" target="_blank" rel="noreferrer noopener">
        <FileSearchOutlined style={{ color: "gray" }} />
      </a>

      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={!componentEnabled}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={formRef}
      >
        <Form.Item
          label="Epsilons:"
          required={componentEnabled}
          rules={[{ required: true, message: "Please input epsilon values." }]}
          tooltip="Range of tested epsilon values between 0 and 0.5 inclusive (step size = 0.02)."
        >
          <Slider
            range
            defaultValue={[0, 0.2]}
            disabled={!componentEnabled}
            onChange={(val) => setSliderVal(val)}
            step={SLIDER_STEP}
            max={0.5}
          />
        </Form.Item>

        <Form.Item
          label="Model Lower Bound:"
          required={componentEnabled}
          rules={[{ required: true, message: "Please input the model's lower bound value." }]}
          tooltip="The lower bound for the model's pixel values, usually (0, 1) or (0, 255)."
        >
          <Input type="number" placeholder="0" onChange={(e) => setLowerBound(Number(e.target.value))} />
        </Form.Item>

        <Form.Item
          label="Model Upper Bound:"
          required={componentEnabled}
          rules={[{ required: true, message: "Please input the model's upper bound value." }]}
          tooltip="The upper bound for the model's pixel values, usually (0, 1) or (0, 255)."
        >
          <Input type="number" placeholder="255" onChange={(e) => setUpperBound(Number(e.target.value))} />
        </Form.Item>

        <div style={{ textAlign: "left", marginTop: "5em" }}>
          <DeepFoolAttack formEnabled={componentEnabled} formRef={deepFoolRef} {...{ sliderVal, lowerBound, upperBound }} />
          <FastGradientAttack formEnabled={componentEnabled} formRef={fastGradientRef} {...{ sliderVal, lowerBound, upperBound }} />
          <BasicIterativeAttack formEnabled={componentEnabled} formRef={basicIterativeRef} {...{ sliderVal, lowerBound, upperBound }} />
          <AdditiveGaussianNoiseAttack
            formEnabled={componentEnabled}
            formRef={additiveGaussianRef}
            {...{ sliderVal, lowerBound, upperBound }}
          />
          <AdditiveUniformNoiseAttack
            formEnabled={componentEnabled}
            formRef={additiveUniformRef}
            {...{ sliderVal, lowerBound, upperBound }}
          />
          <InversionAttack formEnabled={componentEnabled} formRef={inversionRef} {...{ sliderVal, lowerBound, upperBound }} />
          <SaltAndPepperNoiseAttack formEnabled={componentEnabled} formRef={saltAndPepperRef} {...{ sliderVal, lowerBound, upperBound }} />
          <ContrastReductionAttack
            formEnabled={componentEnabled}
            formRef={contrastReductionRef}
            {...{ sliderVal, lowerBound, upperBound }}
          />
        </div>
      </Form>
    </>
  );
};

export default FoolboxLib;
