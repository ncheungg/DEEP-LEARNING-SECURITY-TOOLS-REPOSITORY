import React from "react";
import { Collapse } from "antd";
import CleverHansCards from "./infoCards/CleverHansCards";
import FoolboxCards from "./infoCards/FoolboxCards";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const InfoCollapse: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="CleverHans Attacks" key="1">
        <CleverHansCards />
      </Panel>
      <Panel header="Foolbox Attacks" key="2">
        <FoolboxCards />
      </Panel>
    </Collapse>
  );
};

export default InfoCollapse;
