import React from "react";
import { Collapse } from "antd";
import FoolboxInfo from "./FoolboxInfo";
import FoolboxCards from "./infoCards/FoolBoxCards";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const InfoAccordion: React.FC = () => (
  <Collapse accordion>
    <Panel header="Foolbox Attacks" key="1">
      <FoolboxCards />
    </Panel>
    <Panel header="Privacy Attacks" key="2">
      {/* <PrivLib /> */}
    </Panel>
  </Collapse>
);

export default InfoAccordion;
