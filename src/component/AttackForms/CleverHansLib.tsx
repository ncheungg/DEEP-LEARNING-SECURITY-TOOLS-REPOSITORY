import React, { useRef, useState } from "react";
import { FileSearchOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox, Slider, FormInstance, Radio } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import type { MenuProps } from "antd";
import FastGradientMethodAttack from "../attacks/cleverhans/FastGradientMethodAttack";
import ProjectedGradientDescentAttack from "../attacks/cleverhans/ProjectedGradientDescentAttack";
import BasicIterativeMethodAttack from "../attacks/cleverhans/BasicIterativeMethodAttack";
import MadryEtAlMethodAttack from "../attacks/cleverhans/MadryEtAlMethodAttack";
import MomentumIterativeMethodAttack from "../attacks/cleverhans/MomentumIterativeMethodAttack";
import SPSAAttack from "../attacks/cleverhans/SPSAAttack";

const SLIDER_STEP = 0.01;

interface CleverHansLibProps {
  formRef: React.MutableRefObject<FormInstance<any>>;
}

const CleverHansLib = (props: CleverHansLibProps) => {
  const { formRef } = props;

  const basicIterativeRef = useRef<FormInstance<any>>();
  const fastGradientRef = useRef<FormInstance<any>>();
  const madryEtAlRef = useRef<FormInstance<any>>();
  const momentumIterativeRef = useRef<FormInstance<any>>();
  const projectedGradientDescentRef = useRef<FormInstance<any>>();
  const spsaRef = useRef<FormInstance<any>>();

  // enable/disable form checkbox
  const [componentEnabled, setComponentEnabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentEnabled(disabled);
  };

  const [epsilonRange, setepsilonRange] = useState<[number, number]>([0.02, 0.06]);
  const [epsilonStep, setEpsilonStep] = useState<number>();
  const [attackIterations, setAttackIterations] = useState<number>();
  const [norm, setNorm] = useState("2");

  const onFinish = () => {
    basicIterativeRef?.current?.submit();
    fastGradientRef?.current?.submit();
    madryEtAlRef?.current?.submit();
    momentumIterativeRef?.current?.submit();
    projectedGradientDescentRef?.current?.submit();
    spsaRef?.current?.submit();
  };

  return (
    <>
      <Checkbox checked={componentEnabled} onChange={(e) => setComponentEnabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>Enable CleverHans</b>
      </Checkbox>
      <a href="/documentation#cleverhans" target="_blank" rel="noreferrer noopener">
        <FileSearchOutlined style={{ color: "gray" }} />
      </a>

      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={!componentEnabled}
        style={{ textAlign: "left" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={formRef}
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
            onChange={(val) => setepsilonRange(val)}
            step={SLIDER_STEP}
            max={0.25}
          />
        </Form.Item>

        <Form.Item
          label="Order of the Norm:"
          required={componentEnabled}
          rules={[{ required: true, message: "Please input the desired order of the norms." }]}
          tooltip="A vectors norm is another way to refer to its length. L1, L2, and Linf are 3 different ways to calculate a vectors length. L1 norm is calculated as the sum of the absolute vector values from the origin (Manhattan distance). L2 norm is calculated by determining the distance of the vector from the origin (Euclidean distance). Linf norm is calculated by returning the max value of the vector."
        >
          <Radio.Group value={norm} onChange={(e) => setNorm(e.target.value)}>
            <Radio value="2">2</Radio>
            <Radio value="inf">∞</Radio>
          </Radio.Group>
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
          label="Epsilon Step:"
          required={componentEnabled}
          rules={[{ required: true, message: "Please input the epsilon step value." }]}
          tooltip="The value epsilon would increment by for each attack iteration."
        >
          <Input type="number" placeholder="0.01" onChange={(e) => setEpsilonStep(Number(e.target.value))} />
        </Form.Item>

        <div style={{ textAlign: "left", marginTop: "5em" }}>
          <FastGradientMethodAttack
            formEnabled={componentEnabled}
            formRef={fastGradientRef}
            {...{ epsilonRange, epsilonStep, attackIterations, norm, epsilonRangeStep: SLIDER_STEP }}
          />
          <ProjectedGradientDescentAttack
            formEnabled={componentEnabled}
            formRef={projectedGradientDescentRef}
            {...{ epsilonRange, epsilonStep, attackIterations, norm, epsilonRangeStep: SLIDER_STEP }}
          />
          <BasicIterativeMethodAttack
            formEnabled={componentEnabled}
            formRef={basicIterativeRef}
            {...{ epsilonRange, epsilonStep, attackIterations, norm, epsilonRangeStep: SLIDER_STEP }}
          />
          <MadryEtAlMethodAttack
            formEnabled={componentEnabled}
            formRef={madryEtAlRef}
            {...{ epsilonRange, epsilonStep, attackIterations, norm, epsilonRangeStep: SLIDER_STEP }}
          />
          <SPSAAttack
            formEnabled={componentEnabled}
            formRef={spsaRef}
            {...{ epsilonRange, epsilonStep, attackIterations, norm, epsilonRangeStep: SLIDER_STEP }}
          />
          <MomentumIterativeMethodAttack
            formEnabled={componentEnabled}
            formRef={momentumIterativeRef}
            {...{ epsilonRange, epsilonStep, attackIterations, norm, epsilonRangeStep: SLIDER_STEP }}
          />
        </div>
      </Form>
    </>
  );
};

export default CleverHansLib;
