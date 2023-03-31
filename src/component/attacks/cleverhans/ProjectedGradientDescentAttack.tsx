import { runCleverhansProjectedGradientDescentAttack } from "@/api/cleverhans";
import { modelNameState, datasetNameState, attackPromiseState } from "@/recoil/Atom";
import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Radio, Row, Tooltip } from "antd";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface AttackProps {
  formEnabled: boolean;
  formRef: React.MutableRefObject<any>;
  epsilonRange: [number, number];
  epsilonRangeStep: number;
  epsilonStep?: number;
  attackIterations?: number;
  norm: string;
}

const ProjectedGradientDescentAttack = (props: AttackProps) => {
  const { formEnabled, formRef, epsilonRange, epsilonRangeStep, epsilonStep, attackIterations, norm } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);

  const modelName = useRecoilValue(modelNameState);
  const datasetName = useRecoilValue(datasetNameState);

  const setAttackPromises = useSetRecoilState(attackPromiseState);

  const onFinish = () => {
    if (formEnabled && subFormEnabled) {
      const promise = runCleverhansProjectedGradientDescentAttack({
        modelName,
        datasetName,
        epsilonRange,
        epsilonRangeStep,
        norm,
        epsilonStep,
        attackIterations,
      });

      setAttackPromises((currentState) => [...currentState, promise]);
    }
  };
  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>Projected Gradient Descent Attack</b>
      </Checkbox>
      <Tooltip title="Click for Projected Gradient Descent Attack Documentation">
        <a href="/documentation#cleverhans-projected-gradient-descent-attack" target="_blank" rel="noreferrer noopener">
          <InfoCircleOutlined style={{ color: "gray" }} />
        </a>
      </Tooltip>
      <Form
        labelCol={{ span: 8 }}
        // wrapperCol={{ span: 20 }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        disabled={!subFormEnabled || !formEnabled}
        style={{ height: "2em" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={formRef}
      ></Form>
    </>
  );
};

export default ProjectedGradientDescentAttack;
