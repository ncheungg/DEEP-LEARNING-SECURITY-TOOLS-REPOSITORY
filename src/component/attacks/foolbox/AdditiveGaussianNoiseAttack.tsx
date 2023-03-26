import { runFoolboxAdditiveGaussianAttack } from "@/api/foolbox";
import { attackPromiseState, datasetNameState, modelNameState } from "@/recoil/Atom";
import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, FormInstance, Radio, Row, Tooltip } from "antd";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface AttackProps {
  formEnabled: boolean;
  formRef: React.MutableRefObject<any>;
  epsilonRange: [number, number];
  epsilonStep: number;
  lowerBound?: number;
  upperBound?: number;
}

const AdditiveGaussianNoiseAttack = (props: AttackProps) => {
  const { formEnabled, formRef, epsilonRange, lowerBound, upperBound, epsilonStep } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);
  const [attackTypes, setAttackTypes] = useState<string[]>([]);

  const modelName = useRecoilValue(modelNameState);
  const datasetName = useRecoilValue(datasetNameState);

  const setAttackPromises = useSetRecoilState(attackPromiseState);

  const onFinish = () => {
    if (formEnabled && subFormEnabled) {
      const promise = runFoolboxAdditiveGaussianAttack({
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
        <b>Additive Gaussian Noise Attack</b>
      </Checkbox>
      <Tooltip title="Samples Gaussian noise with or without repeated/clipping. (Click for Additive Gaussian Noise Attack Documentation)">
        <a href="/documentation#foolbox-additive-gaussian-noise-attack" target="_blank" rel="noreferrer noopener">
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
          label="Order of the Norm:"
          rules={[{ required: true, message: "Please input Order of the Norm Value." }]}
          required={subFormEnabled}
          tooltip="Order of the Norm Definition: A vectors norm is another way to refer to its length. L1, L2, and Linf are 3 different ways to calculate a vectors length. L1 norm is calculated as the sum of the absolute vector values from the origin (Manhattan distance). L2 norm is calculated by determining the distance of the vector from the origin (Euclidean distance). Linf norm is calculated by returning the max value of the vector."
        >
          <Radio.Group value="2">
            <Radio value="2">2</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Attack Types:"
          rules={[{ required: true, message: "Please input desired attack types." }]}
          required={subFormEnabled}
          tooltip="Samples Gaussian noise with or without repeated/clipping."
          style={{ marginTop: "-2em" }}
        >
          <Checkbox.Group style={{ width: "100%" }} onChange={(vals) => setAttackTypes(vals as string[])}>
            <Checkbox value="additive">Additive</Checkbox>
            <Checkbox value="clipping-aware-additive">Clipping</Checkbox>
            <Checkbox value="repeated-additive">Repeated</Checkbox>
            <Checkbox value="clipping-aware-repeated-additive">Clipping & Repeated</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdditiveGaussianNoiseAttack;
