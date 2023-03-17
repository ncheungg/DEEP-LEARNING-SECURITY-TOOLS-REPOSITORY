import React, { useState, useRef } from "react";
import { FileSearchOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox, Slider, FormInstance } from "antd";
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
  formRef: React.MutableRefObject<FormInstance<any>>;
}

const FoolboxLib = (props: FoolboxLibProps) => {
  const { formRef } = props;

  const deepFoolRef = useRef<FormInstance<any>>();
  const fastGradientRef = useRef<FormInstance<any>>();
  const basicIterativeRef = useRef<FormInstance<any>>();
  const additiveUniformRef = useRef<FormInstance<any>>();
  const additiveGaussianRef = useRef<FormInstance<any>>();
  const inversionRef = useRef<FormInstance<any>>();
  const saltAndPepperRef = useRef<FormInstance<any>>();
  const contrastReductionRef = useRef<FormInstance<any>>();

  // enable/disable form checkbox
  const [componentEnabled, setComponentEnabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentEnabled(disabled);
  };

  const [epsilonRange, setepsilonRange] = useState<[number, number]>([0, 0.2]);
  const [lowerBound, setLowerBound] = useState<number>();
  const [upperBound, setUpperBound] = useState<number>();

  const onFinish = () => {
    deepFoolRef?.current?.submit();
    fastGradientRef?.current?.submit();
    basicIterativeRef?.current?.submit();
    additiveUniformRef?.current?.submit();
    additiveGaussianRef?.current?.submit();
    inversionRef?.current?.submit();
    saltAndPepperRef?.current?.submit();
    contrastReductionRef?.current?.submit();
  };

  return (
    <>
      <Checkbox checked={componentEnabled} onChange={(e) => setComponentEnabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>Enable Foolbox</b>
      </Checkbox>
      <a href="/documentation#foolbox" target="_blank" rel="noreferrer noopener">
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
            onChange={(val) => setepsilonRange(val)}
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
          <DeepFoolAttack
            formEnabled={componentEnabled}
            formRef={deepFoolRef}
            epsilonStep={SLIDER_STEP}
            {...{ epsilonRange, lowerBound, upperBound }}
          />
          <FastGradientAttack
            formEnabled={componentEnabled}
            formRef={fastGradientRef}
            epsilonStep={SLIDER_STEP}
            {...{ epsilonRange, lowerBound, upperBound }}
          />
          <BasicIterativeAttack
            formEnabled={componentEnabled}
            formRef={basicIterativeRef}
            epsilonStep={SLIDER_STEP}
            {...{ epsilonRange, lowerBound, upperBound }}
          />
          <AdditiveGaussianNoiseAttack
            formEnabled={componentEnabled}
            formRef={additiveGaussianRef}
            epsilonStep={SLIDER_STEP}
            {...{ epsilonRange, lowerBound, upperBound }}
          />
          <AdditiveUniformNoiseAttack
            formEnabled={componentEnabled}
            formRef={additiveUniformRef}
            epsilonStep={SLIDER_STEP}
            {...{ epsilonRange, lowerBound, upperBound }}
          />
          <InversionAttack
            formEnabled={componentEnabled}
            formRef={inversionRef}
            epsilonStep={SLIDER_STEP}
            {...{ epsilonRange, lowerBound, upperBound }}
          />
          <SaltAndPepperNoiseAttack
            formEnabled={componentEnabled}
            formRef={saltAndPepperRef}
            epsilonStep={SLIDER_STEP}
            {...{ epsilonRange, lowerBound, upperBound }}
          />
          <ContrastReductionAttack
            formEnabled={componentEnabled}
            formRef={contrastReductionRef}
            epsilonStep={SLIDER_STEP}
            {...{ epsilonRange, lowerBound, upperBound }}
          />
        </div>
      </Form>
    </>
  );
};

export default FoolboxLib;
