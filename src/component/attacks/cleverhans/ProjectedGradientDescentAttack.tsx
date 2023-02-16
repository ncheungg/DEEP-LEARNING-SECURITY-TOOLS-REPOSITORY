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
      {/* <Tooltip title="Fast Gradient Method (2) and Fast Gradient Signed Method (∞).">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip> */}

      <div style={{ height: "2em" }}></div>
    </>
  );
};

export default ProjectedGradientDescentAttack;
