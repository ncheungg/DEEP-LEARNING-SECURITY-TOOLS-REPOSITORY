import React, { useEffect, useRef, useState } from "react";
import { Button, FormInstance, message, Steps, theme } from "antd";
import UploadModelCard from "./AttackCards/UploadModelCard";
import UploadTestCard from "./AttackCards/UploadTestCard";
import AttacksLibCard from "./AttackCards/AttacksLibCard";
import { PlayCircleFilled } from "@ant-design/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { attackPromiseState, attackResultState, datasetNameState, modelNameState } from "@/recoil/Atom";
import LoadingModal from "./LoadingModal";
import { sleep } from "utils";
import useStickyState from "utils/useStickyState";
import { useRouter } from "next/router";
import { runOriginalAttack } from "@/api/original";

const AttackSteps: React.FC<{ setCurrentStep: (step: number) => void }> = ({ setCurrentStep }) => {
  const router = useRouter();

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  // loading modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTime, setModalTime] = useState(0);

  // const [attackResults, setAttackResults] = useStickyState({}, "attack-results");

  const setAttackResults = useSetRecoilState(attackResultState);

  const attackPromises = useRecoilValue(attackPromiseState);
  const [hasClickedButton, setHasClickedButton] = useState(false);

  useEffect(() => {
    setAttackResults([]);
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
    setCurrent((prev) => {
      setCurrentStep(prev + 1); // call setCurrentStep function from parent
      return prev + 1;
    });
  };

  const prev = () => {
    setCurrent((prev) => {
      setCurrentStep(prev - 1); // call setCurrentStep function from parent
      return prev - 1;
    });
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

  const modelName = useRecoilValue(modelNameState);
  const datasetName = useRecoilValue(datasetNameState);

  const setAttackPromises = useSetRecoilState(attackPromiseState);

  const submitForms = () => {
    // add original attack to promise arr
    const promise = runOriginalAttack({
      modelName,
      datasetName,
    });
    setAttackPromises((currentState) => [...currentState, promise]);

    // submit all subforms
    foolboxRef?.current?.submit();
    cleverhansRef?.current?.submit();
    privRef?.current?.submit();
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
    const results = [];

    for (const value of values) {
      const valueResolved = await value;
      console.log({ valueResolved });
      results.push(valueResolved);
    }

    if (signal.aborted) return;

    // do the actual shit
    setAttackResults(results);

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
