import { Card, FormInstance } from "antd";
import React from "react";
import { Collapse } from "antd";
import FoolboxLib from "@/component/AttackForms/FoolboxLib";
import CleverHansLib from "@/component/AttackForms/CleverHansLib";
import PrivLib from "@/component/AttackForms/PrivacyMeter";

const { Panel } = Collapse;

interface AttacksLibCardProps {
  foolboxRef: React.MutableRefObject<any>;
  cleverhansRef: React.MutableRefObject<any>;
  privRef: React.MutableRefObject<any>;
}

const AttacksLibCard = (props: AttacksLibCardProps) => {
  const { foolboxRef, cleverhansRef, privRef } = props;

  return (
    <Card
      title="Select attacks to run on your model and include parameters"
      bordered={false}
      style={{ width: 824, height: 550, overflow: "auto" }}
    >
      <Collapse accordion>
        <Panel header="Foolbox" key="0">
          <FoolboxLib formRef={foolboxRef} />
        </Panel>
        <Panel header="CleverHans" key="1">
          <CleverHansLib formRef={cleverhansRef} />
        </Panel>
        <Panel header="ML Privacy Meter" key="2">
          <PrivLib formRef={privRef} />
        </Panel>
      </Collapse>
    </Card>
  );
};

export default AttacksLibCard;
