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
