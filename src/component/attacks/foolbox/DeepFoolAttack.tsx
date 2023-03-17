import { runFoolboxDeepFoolAttack } from "@/api/foolbox";
import { attackPromiseState, datasetNameState, modelNameState } from "@/recoil/Atom";
import { FileSearchOutlined, InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, FormInstance, Row, Tooltip } from "antd";
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

const DeepFoolAttack = (props: AttackProps) => {
  const { formEnabled, formRef, epsilonRange, lowerBound, upperBound, epsilonStep } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);
  const [selectedNorms, setSelectedNorms] = useState<string[]>([]);

  const modelName = useRecoilValue(modelNameState);
  const datasetName = useRecoilValue(datasetNameState);

  const setAttackPromises = useSetRecoilState(attackPromiseState);

  const onFinish = () => {
    if (formEnabled && subFormEnabled) {
      const promise = runFoolboxDeepFoolAttack({
        upperBound,
        lowerBound,
        epsilonRange,
        epsilonStep,
        modelName,
        datasetName,
        norms: selectedNorms,
      });
      setAttackPromises((currentState) => [...currentState, promise]);
    }
  };

  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>Deep Fool Attack</b>
      </Checkbox>
      <Tooltip title="A simple and fast gradient-based adversarial attack. Implements the DeepFool attack. (Click for Deep Fool Attack Documentation)">
        <a href="/documentation#foolbox-deep-fool-attack" target="_blank" rel="noreferrer noopener">
          <InfoCircleOutlined style={{ color: "gray" }} />
        </a>
      </Tooltip>

      {/* attack inputs */}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        disabled={!subFormEnabled || !formEnabled}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        // ref={formRef as React.MutableRefObject<FormInstance<any>>}
        ref={formRef}
      >
        <Form.Item
          tooltip="Order of the Norm Definition: A vectors norm is another way to refer to its length. L1, L2, and Linf are 3 different ways to calculate a vectors length. L1 norm is calculated as the sum of the absolute vector values from the origin (Manhattan distance). L2 norm is calculated by determining the distance of the vector from the origin (Euclidean distance). Linf norm is calculated by returning the max value of the vector."
          label="Order of the Norm:"
          required={subFormEnabled}
          rules={[{ required: true, message: "Please input Order of the Norm Value." }]}
        >
          <Checkbox.Group style={{ width: "100%" }} onChange={(vals) => setSelectedNorms(vals as string[])}>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="inf">∞</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default DeepFoolAttack;
