import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Radio, Row, Tooltip } from "antd";
import { useState } from "react";

interface AttackProps {
  formEnabled: boolean;
  sliderVal: [number, number];
  lowerBound?: number;
  upperBound?: number;
}

const SaltAndPepperNoiseAttack = (props: AttackProps) => {
  const { formEnabled } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);

  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>Salt & Pepper Noise Attack</b>
      </Checkbox>
      <Tooltip title="Increases the amount of salt and pepper noise until the input is misclassified.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>

      <div style={{ height: "2em" }}></div>
    </>
  );
};

export default SaltAndPepperNoiseAttack;
