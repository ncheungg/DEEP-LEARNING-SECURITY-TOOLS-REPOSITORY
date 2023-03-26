import { runCleverhansBasicIterativeAttack } from "@/api/cleverhans";
import { attackPromiseState, datasetNameState, modelNameState } from "@/recoil/Atom";
import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Form, Tooltip } from "antd";
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

const BasicIterativeMethodAttack = (props: AttackProps) => {
  const { formEnabled, formRef, epsilonRange, epsilonRangeStep, epsilonStep, attackIterations, norm } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);

  const modelName = useRecoilValue(modelNameState);
  const datasetName = useRecoilValue(datasetNameState);

  const setAttackPromises = useSetRecoilState(attackPromiseState);

  const onFinish = () => {
    if (formEnabled && subFormEnabled) {
      const promise = runCleverhansBasicIterativeAttack({
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
        <b>Basic Iterative Method Attack</b>
      </Checkbox>
      <Tooltip title="Click for Basic Iterative Method Attack Documentation">
        <a href="/documentation#cleverhans-basic-iterative-method-attack" target="_blank" rel="noreferrer noopener">
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

export default BasicIterativeMethodAttack;
