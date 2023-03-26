import { runFoolboxContrastReductionAttack } from "@/api/foolbox";
import { attackPromiseState, datasetNameState, modelNameState } from "@/recoil/Atom";
import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, FormInstance, Radio, Row, Tooltip } from "antd";
import { Ref, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface AttackProps {
  formEnabled: boolean;
  formRef: React.MutableRefObject<any>;
  epsilonRange: [number, number];
  epsilonStep: number;
  lowerBound?: number;
  upperBound?: number;
}

const ContrastReductionAttack = (props: AttackProps) => {
  const { formEnabled, formRef, epsilonRange, lowerBound, upperBound, epsilonStep } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);
  const [attackTypes, setAttackTypes] = useState<string[]>([]);

  const modelName = useRecoilValue(modelNameState);
  const datasetName = useRecoilValue(datasetNameState);

  const setAttackPromises = useSetRecoilState(attackPromiseState);

  const onFinish = () => {
    if (formEnabled && subFormEnabled) {
      const promise = runFoolboxContrastReductionAttack({
        upperBound,
        lowerBound,
        epsilonRange,
        epsilonStep,
        modelName,
        datasetName,
        attackTypes,
      });
      setAttackPromises((currentState) => [...currentState, promise]);
    }
  };

  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>Contrast Reduction Attack</b>
      </Checkbox>
      <Tooltip title="Reduces the contrast of the input using a the specified search type to find the smallest adversarial perturbation. (Click for Contrast Reduction Attack Documentation)">
        <a href="/documentation#foolbox-contrast-reduction-attack" target="_blank" rel="noreferrer noopener">
          <InfoCircleOutlined style={{ color: "gray" }} />
        </a>
      </Tooltip>

      {/* attack inputs */}
      <Form
        labelCol={{ span: 8 }}
        // wrapperCol={{ span: 20 }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        disabled={!subFormEnabled || !formEnabled}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={formRef}
      >
        <Form.Item
          label="Search Types:"
          rules={[{ required: true, message: "Please input desired search types." }]}
          required={subFormEnabled}
          tooltip="Linear/Binary search to find the smallest adversarial perturbation."
          // style={{ marginTop: "-2em" }}
        >
          <Checkbox.Group style={{ width: "100%" }} onChange={(vals) => setAttackTypes(vals as string[])}>
            <Checkbox value="binary">Binary</Checkbox>
            <Checkbox value="linear">Linear</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default ContrastReductionAttack;
