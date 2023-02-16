import React from "react";
import { Collapse } from "antd";
import AdvLib from "./AdvLib";
import PrivLib from "./PrivLib";
import FoolboxLib from "./FoolboxLib";
import CleverHansLib from "./CleverHansLib";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const AccordionAttack: React.FC = () => (
  <Collapse accordion defaultActiveKey="0">
    <Panel header="Foolbox" key="0">
      <FoolboxLib />
    </Panel>
    <Panel header="CleverHans" key="1">
      <CleverHansLib />
      {/* <AdvLib /> */}
    </Panel>
    <Panel header="Privacy Attacks" key="2">
      <PrivLib />
    </Panel>
  </Collapse>
);

export default AccordionAttack;
