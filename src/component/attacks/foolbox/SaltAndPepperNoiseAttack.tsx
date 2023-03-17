import { datasetNameState, modelNameState } from "@/recoil/Atom";
import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, FormInstance, Radio, Row, Tooltip } from "antd";
import { useState } from "react";
import { useRecoilValue } from "recoil";

interface AttackProps {
  formEnabled: boolean;
  formRef: React.MutableRefObject<any>;
  epsilonRange: [number, number];
  epsilonStep: number;
  lowerBound?: number;
  upperBound?: number;
}

const SaltAndPepperNoiseAttack = (props: AttackProps) => {
  const { formEnabled, formRef, epsilonRange, lowerBound, upperBound, epsilonStep } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);

  const modelName = useRecoilValue(modelNameState);
  const datasetName = useRecoilValue(datasetNameState);

  // const onFinish = () => {
  //   if (formEnabled && subFormEnabled) {
  //     runAdditiveGaussianAttack({ upperBound, lowerBound, epsilonRange, epsilonStep, modelName, datasetName, attackTypes });
  //   }
  // };

  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>Salt & Pepper Noise Attack</b>
      </Checkbox>
      <Tooltip title="Increases the amount of salt and pepper noise until the input is misclassified. (Click for Salt & Pepper Noise Attack Documentation)">
        <a href="/documentation#foolbox-salt-and-pepper-noise-attack" target="_blank" rel="noreferrer noopener">
          <InfoCircleOutlined style={{ color: "gray" }} />
        </a>
      </Tooltip>

      <div style={{ height: "2em" }}></div>
    </>
  );
};

export default SaltAndPepperNoiseAttack;
