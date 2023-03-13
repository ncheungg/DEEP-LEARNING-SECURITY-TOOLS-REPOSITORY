import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Radio, Row, Tooltip } from "antd";
import { useState } from "react";

interface AttackProps {
  formEnabled: boolean;
  formRef: React.MutableRefObject<null>;
  sliderVal: [number, number];
  lowerBound?: number;
  upperBound?: number;
}

const InversionAttack = (props: AttackProps) => {
  const { formEnabled, formRef } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);

  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>Inversion Attack</b>
      </Checkbox>
      <Tooltip title='Creates "negative images" by inverting the pixel values. (Click for Inversion Attack Attack Documentation)'>
        <a href="/about#foolbox-inversion-attack" target="_blank" rel="noreferrer noopener">
          <InfoCircleOutlined style={{ color: "gray" }} />
        </a>
      </Tooltip>

      <div style={{ height: "2em" }}></div>
    </>
  );
};

export default InversionAttack;
