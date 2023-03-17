import React, { useEffect, useState } from "react";
import { Button, Modal, Spin } from "antd";

interface LoadingModalProps {
  isOpen: boolean;
  initialTimeLeft: number;
}

let intervalTimer: NodeJS.Timer;

const LoadingModal = (props: LoadingModalProps) => {
  const { isOpen, initialTimeLeft } = props;

  const [timeLeft, setTimeLeft] = useState(0);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  const decrementTimeLeft = () => {
    setTimeLeft(Math.max(0, timeLeft - 1));
  };

  // on open, start an interval timer to decrement time left every 2 minutes
  useEffect(() => {
    if (isOpen) {
      clearInterval(intervalTimer);
      setTimeLeft(initialTimeLeft);

      intervalTimer = setInterval(decrementTimeLeft, 120000);
    } else {
      clearInterval(intervalTimer);
    }
  }, [isOpen]);

  return (
    <Modal
      title="Running Attacks"
      open={isOpen}
      // onOk={handleOk}
      // onCancel={handleCancel}
      centered
      closable={false}
      confirmLoading
      footer={[]}
      style={{ textAlign: "center" }}
    >
      <Spin tip={`Estimated time remaining: ${timeLeft} minutes`} style={{ marginTop: "2em", textAlign: "center" }} />
    </Modal>
  );
};

export default LoadingModal;
