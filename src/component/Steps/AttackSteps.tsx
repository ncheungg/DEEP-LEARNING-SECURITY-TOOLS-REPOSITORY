import React, { useEffect, useRef, useState } from "react";
import { Button, FormInstance, message, Steps, theme } from "antd";
import UploadModelCard from "./AttackCards/UploadModelCard";
import UploadTestCard from "./AttackCards/UploadTestCard";
import AttacksLibCard from "./AttackCards/AttacksLibCard";
import { PlayCircleFilled } from "@ant-design/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { attackPromiseState } from "@/recoil/Atom";
import LoadingModal from "./LoadingModal";
import { sleep } from "utils";
import useStickyState from "utils/useStickyState";
import { useRouter } from "next/router";

const AttackSteps: React.FC = () => {
  const router = useRouter();

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  // loading modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTime, setModalTime] = useState(0);

  const [attackResults, setAttackResults] = useStickyState({}, "attack-results");
  const attackPromises = useRecoilValue(attackPromiseState);
  const [hasClickedButton, setHasClickedButton] = useState(false);

  useEffect(() => {
    setAttackResults(null);
  }, []);

  const foolboxRef = useRef<FormInstance<any>>();
  const cleverhansRef = useRef<FormInstance<any>>();
  const privRef = useRef<FormInstance<any>>();

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
      content: <AttacksLibCard {...{ foolboxRef, cleverhansRef, privRef }} />,
    },
  ];

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
    }, 10000);
  };

  const submitForms = () => {
    foolboxRef?.current?.submit();
    cleverhansRef?.current?.submit();
  };

  const openLoadingModal = () => {
    setModalTime(10);
    setIsModalOpen(true);
  };

  const parsePromises = (values: string[]) => {
    const arr = [];

    for (const value of values) {
      arr.push(JSON.parse(value));
    }

    return arr;
  };

  const resolveAllAttackPromises = async (signal: AbortSignal) => {
    console.log({ attackPromises });

    if (attackPromises.length === 0) return;

    // wait for all promises to resolve
    const values = await Promise.all(attackPromises);
    if (signal.aborted) return;

    // do the actual shit
    setAttackResults(values);

    // redirect to results page
    router.push("/results");
  };

  useEffect(() => {
    const controller = new AbortController();

    if (hasClickedButton) {
      resolveAllAttackPromises(controller.signal);
    }

    return () => {
      controller.abort();
    };
  }, [attackPromises, hasClickedButton]);

  return (
    <>
      <LoadingModal isOpen={isModalOpen} initialTimeLeft={modalTime} />
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
            onClick={async (e) => {
              enterLoading(1);

              submitForms();

              openLoadingModal();

              // sleep for 10 seconds
              await sleep(10000);
              setHasClickedButton(true);
            }}
            loading={loadings[1]}
            // href="/results"
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
