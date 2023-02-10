import AccordionAttack from "@/component/AttackForms/AccordionAttack";
import { Card } from "antd";
import React from "react";

const AttacksLibCard: React.FC = () => (
  <Card
    title="Select attacks to run on your model and include parameters"
    bordered={false}
    style={{ width: 824, height: 550, overflow: "auto" }}
  >
    <AccordionAttack />
  </Card>
);

export default AttacksLibCard;
