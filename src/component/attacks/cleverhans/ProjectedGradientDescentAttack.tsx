import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Radio, Row, Tooltip } from "antd";
import { useState } from "react";

interface AttackProps {
  formEnabled: boolean;
  sliderVal: [number, number];
  epsilonStep?: number;
  attackIterations?: number;
}

const ProjectedGradientDescentAttack = (props: AttackProps) => {
  const { formEnabled } = props;

  const [subFormEnabled, setSubFormEnabled] = useState(false);

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

      <div style={{ height: "2em" }}></div>
    </>
  );
};

export default ProjectedGradientDescentAttack;
