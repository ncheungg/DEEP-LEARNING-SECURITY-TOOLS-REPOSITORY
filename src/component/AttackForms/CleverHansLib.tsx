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
import FastGradientMethodAttack from "../attacks/cleverhans/FastGradientMethodAttack";
import ProjectedGradientDescentAttack from "../attacks/cleverhans/ProjectedGradientDescentAttack";
import BasicIterativeMethodAttack from "../attacks/cleverhans/BasicIterativeMethodAttack";
import MadryEtAlMethodAttack from "../attacks/cleverhans/MadryEtAlMethodAttack";
import MomentumIterativeMethodAttack from "../attacks/cleverhans/MomentumIterativeMethodAttack";
import SPSAAttack from "../attacks/cleverhans/SPSAAttack";

const SLIDER_STEP = 0.01;

const CleverHansLib: React.FC = () => {
  // enable/disable form checkbox
  const [componentEnabled, setComponentEnabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentEnabled(disabled);
  };

  const [sliderVal, setSliderVal] = useState<[number, number]>([0.02, 0.06]);
  const [epsilonStep, setEpsilonStep] = useState<number>();
  const [attackIterations, setAttackIterations] = useState<number>();
  const [decayFactor, setDecayFactor] = useState<number>();

  return (
    <>
      <Checkbox checked={componentEnabled} onChange={(e) => setComponentEnabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>Enable CleverHans</b>
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
        <Form.Item
          label="Epsilon Starts:"
          required={componentEnabled}
          rules={[{ required: true, message: "Please input the starting epsilon value." }]}
          tooltip="A range of starting epsilon value — each value in the range will be a single attack that runs based on the epsilon step and attack iteration values"
        >
          <Slider
            range
            defaultValue={[0.02, 0.06]}
            disabled={!componentEnabled}
            onChange={(val) => setSliderVal(val)}
            step={SLIDER_STEP}
            max={0.25}
          />
        </Form.Item>

        <Form.Item
          label="Epsilon Step:"
          required={componentEnabled}
          rules={[{ required: true, message: "Please input the epsilon step value." }]}
          tooltip="The value epsilon would increment by for each attack iteration."
        >
          <Input type="number" placeholder="0.01" onChange={(e) => setEpsilonStep(Number(e.target.value))} />
        </Form.Item>

        <Form.Item
          label="Order of the Norm:"
          required={componentEnabled}
          rules={[{ required: true, message: "Please input the desired order of the norms." }]}
          tooltip="A vectors norm is another way to refer to its length. L1, L2, and Linf are 3 different ways to calculate a vectors length. L1 norm is calculated as the sum of the absolute vector values from the origin (Manhattan distance). L2 norm is calculated by determining the distance of the vector from the origin (Euclidean distance). Linf norm is calculated by returning the max value of the vector."
        >
          <Checkbox.Group style={{ width: "100%" }}>
            <Checkbox value="0">0</Checkbox>
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="inf">∞</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          label="Attack Iterations:"
          required={componentEnabled}
          rules={[{ required: true, message: "Please input the number of attack iterations." }]}
          tooltip="Number of times the attack is performed. Each iteration the epsilon value increases by epsilon step size."
        >
          <Input type="number" onChange={(e) => setAttackIterations(Number(e.target.value))} />
        </Form.Item>

        <Form.Item
          label="Decay Factor:"
          required={componentEnabled}
          rules={[{ required: true, message: "Please enter the decay factor for momentum term." }]}
          tooltip="The decay factor for momentum term."
        >
          <Input type="number" onChange={(e) => setDecayFactor(Number(e.target.value))} />
        </Form.Item>

        <div style={{ textAlign: "left", marginTop: "5em" }}>
          <FastGradientMethodAttack formEnabled={componentEnabled} {...{ sliderVal, epsilonStep, attackIterations, decayFactor }} />
          <ProjectedGradientDescentAttack formEnabled={componentEnabled} {...{ sliderVal, epsilonStep, attackIterations, decayFactor }} />
          <BasicIterativeMethodAttack formEnabled={componentEnabled} {...{ sliderVal, epsilonStep, attackIterations, decayFactor }} />
          <MadryEtAlMethodAttack formEnabled={componentEnabled} {...{ sliderVal, epsilonStep, attackIterations, decayFactor }} />
          <MomentumIterativeMethodAttack formEnabled={componentEnabled} {...{ sliderVal, epsilonStep, attackIterations, decayFactor }} />
          <SPSAAttack formEnabled={componentEnabled} {...{ sliderVal, epsilonStep, attackIterations, decayFactor }} />
        </div>
      </Form>
    </>
  );
};

export default CleverHansLib;