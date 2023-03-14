import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Radio, Row, Tooltip } from "antd";
import { useState } from "react";

interface AttackProps {
  formEnabled: boolean;
  formRef: React.MutableRefObject<any>;
  epsilonRange: [number, number];
  epsilonStep?: number;
  attackIterations?: number;
}

const MadryEtAlMethodAttack = (props: AttackProps) => {
  const { formEnabled, formRef } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);

  return (
    <>
      <Checkbox disabled={!formEnabled} onChange={(e) => setSubFormEnabled(e.target.checked)}>
        <b>Madry et al. Method Attack</b>
      </Checkbox>
      <Tooltip title="Click for Madry et al. Method Attack Documentation">
        <a href="/about#cleverhans-madry-et-al-method-attack" target="_blank" rel="noreferrer noopener">
          <InfoCircleOutlined style={{ color: "gray" }} />
        </a>
      </Tooltip>

      <div style={{ height: "2em" }}></div>
    </>
  );
};

export default MadryEtAlMethodAttack;
