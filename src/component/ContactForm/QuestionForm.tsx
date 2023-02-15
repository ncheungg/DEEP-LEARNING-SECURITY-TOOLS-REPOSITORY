import React from "react";
import { Collapse, Space } from "antd";
import { PlusCircleTwoTone, MinusCircleTwoTone, RightCircleFilled, DownCircleFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const FAQAccordion: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <Collapse
      defaultActiveKey={[]}
      onChange={onChange}
      // accordion={true}
      bordered={false}
      expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
    >
      <Panel header="What is KOMN?" key="1">
        <p>
          {`KOMN is a state of the art open-source aggregator model focusing on 
          three areas of Deep Neural Network(DNN) security: 1) Privacy, 2) Evasion attacks, and 3)
          Adversarial Examples. Our aggregator Model
          allows machine learning developers to test the safety and robustness 
          of their deep learning algorithms with multiple tools for benchmarking purposes.
          Developers will have the ability to test their models against a various set of the most
          popular Trustworthy Machine Learning libraries such as Foolbox, Dioptra and Cleverhans.`}
        </p>
      </Panel>
      <Panel header="Why was KOMN created?" key="2">
        <p>{`KOMN was created with  machine learning developers in mind. As future technology, such as 
        self-driving cars, are being built using neural networks, the safety of end users is at risk of being
         compromised by attacks on the neural network. while multiple efforts are being made to generate a 
         set of tools to evaluate privacy and security risks associated with neural networks, there is a 
         lack of aggregator tool for machine learning developers to test the robustness and safety of 
         their deep learning algorithms with multiple tools for benchmarking purposes.`}</p>
      </Panel>
      <Panel header="Getting Started" key="3">
        <Collapse
          defaultActiveKey={[]}
          accordion={true}
          bordered={false}
          expandIcon={({ isActive }) => (isActive ? <MinusCircleTwoTone /> : <PlusCircleTwoTone />)}
        >
          <Panel header="What files I need to get started?" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="How do I use the aggregator? " key="2">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Panel>

      <Panel header="What attacks are available for me to test my model against?" key="4">
        <p>
          {`A detailed list of all attacks that KOMN supports is available on our `}
          <a href="https://rsa02.netlify.app/about" rel="noopener noreferrer">
            Documentation Page.
          </a>
          {/* target="_blank" <-add this for opening in new tab after link in <a><a> */}
        </p>
      </Panel>
      <Panel header="Is KOMN still in development?" key="5">
        <p>{`Currently, KOMN is still under development. The team is expected to have a complete 
        beta working in early Spring 2023. After gathering feedback from the community,
        the full version will be released in the fall of 2023 Inshallah.`}</p>
      </Panel>
    </Collapse>
  );
};
export default FAQAccordion;
