import React from "react";
import { Collapse, Space } from "antd";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const FAQAccordion: React.FC = () => (
  <Collapse accordion={true} bordered={false} expandIcon={({ isActive }) => (isActive ? <MinusCircleTwoTone /> : <PlusCircleTwoTone />)}>
    <Panel header="Getting Started" key="1 ">
      <p>{text}</p>
    </Panel>
    <Panel header="Foolbox Attack Library" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="ML Privacy Meter Attack Library" key="3">
      <p>{text}</p>
    </Panel>
    <Panel header="Dioptra" key="4">
      <p>{text}</p>
    </Panel>
  </Collapse>
);

export default FAQAccordion;
