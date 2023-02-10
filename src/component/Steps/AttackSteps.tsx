import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";

import UploadModelCard from "./AttackCards/UploadModelCard";
import UploadTestCard from "./AttackCards/UploadTestCard";
import AttacksLibCard from "./AttackCards/AttacksLibCard";
import { PlayCircleFilled } from "@ant-design/icons";

const steps = [
  {
    title: "Step 1",
    content: <UploadModelCard />,
  },
  {
    title: "Step 2",
    content: <UploadTestCard />,
  },
  {
    title: "Step 3",
    content: <AttacksLibCard />,
  },
  //   {
  //     title: "Step 4",
  //     content: <FormSubmitBtn />,
  //   },
];

const AttackSteps: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  //for button
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <>
      <Steps current={current} items={items} />
      <br />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              message.success("Processing complete!");
              enterLoading(1);
            }}
            loading={loadings[1]}
            href="/results"
            icon={<PlayCircleFilled />}
          >
            Scan Model
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default AttackSteps;
