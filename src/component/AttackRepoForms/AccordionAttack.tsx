import React from "react";
import { Collapse } from "antd";
import CleverhansRepoFormCollapse from "./CleverhansLib";
import CleverhansRepoForm from "./CleverhansLib";
import CleverhansLib from "./CleverhansLib";
import FoolboxLib from "./FoolboxLib";
import MLLib from "./MLLib";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const AccordionAttack: React.FC = () => (
  <Collapse accordion>
    <Panel header="Cleverhans Attack Library" key="1">
      <CleverhansLib />
    </Panel>
    <Panel header="Foolbox Attack Library" key="2">
      <FoolboxLib />
    </Panel>
    <Panel header="ML Privacy Meter Attack Library" key="3">
      <MLLib />
    </Panel>
    <Panel header="Dioptra" key="4">
      <CleverhansLib />
    </Panel>
  </Collapse>
);

export default AccordionAttack;
