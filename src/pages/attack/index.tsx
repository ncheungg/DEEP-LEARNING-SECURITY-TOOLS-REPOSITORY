import React, { useState, useEffect } from "react";
import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import { Col, Layout, message, UploadProps } from "antd";
import { Typography } from "antd";
import AttackSteps from "@/component/Steps/AttackSteps";
import { Button, Divider, Space, Tooltip } from "antd";

const { Title } = Typography;
const { Content } = Layout;

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [dummyTooltipVisible, setDummyTooltipVisible] = useState(true);
  const [mainTooltipVisible, setMainTooltipVisible] = useState(false);

  const getTooltipTitle = () => {
    switch (currentStep) {
      case 0:
        return (
          <span>
            <b>Step 1:</b> To get started, upload your TensorFlow SavedModel format machine learning model by either dragging and dropping
            the file or clicking on the white space above.
            <br />
            <br />
            Once the upload is complete, the file name will be displayed.
            <br />
            <br />
            When you&apos;re finished, click the &apos;next&apos; button to proceed.
          </span>
        );
      case 1:
        return (
          <span>
            <b>Step 2:</b> Similarly, upload your TensorFlow-Dataset format test data by following the same steps as before.
            <br />
            <br />
            Click the &apos;next&apos; button once the upload is complete.
          </span>
        );
      case 2:
        return (
          <span>
            <b>Step 3:</b> It&apos;s time to select the attacks you would like to perform on your model and insert the relevant parameters.
            <br />
            <br />
            Choose an attack library from the provided list by enabling it through the appropriate checkboxes.
            <br />
            <br />
            Input global parameters and select specific attacks with their specific input parameters.
            <br />
            <br />
            Once you&apos;ve made your selections, click the &apos;Scan Model&apos; button.
            <br />
            <br />
            <b>Optional:</b> If you&apos;re interested, you can view additional attack information in the &apos;Documentation&apos; page or
            by hovering/clicking on the (i) icons beside the specific attacks.
          </span>
        );
      default:
        return "";
    }
  };

  useEffect(() => {
    setDummyTooltipVisible(true);
    const timer = setTimeout(() => {
      setDummyTooltipVisible(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Layout style={{ alignItems: "center" }}>
        <Navbar />

        <Content
          style={{
            backgroundColor: "white",
            minHeight: "calc(100vh - 4em)",
            padding: "3em",
            width: "65em",
          }}
        >
          <Title level={2}>Follow the steps below to scan your machine learning model</Title>
          <br />
          <br />
          <AttackSteps setCurrentStep={setCurrentStep} />

          <a style={{ display: "flex", width: "100%", justifyContent: "right", paddingTop: "25px", paddingRight: "35px" }}>
            {/* Main tooltip object: */}
            <Tooltip title={getTooltipTitle()} color={"#39f"} visible={mainTooltipVisible} key={"#add"}>
              <img style={{ width: 167, height: 164 }} src="https://www.dropbox.com/s/i7lwp2rjh0835tr/eMiL.png?raw=1" alt="eMiL" />
            </Tooltip>
            {/* Dummy tooltip object: */}
            <Tooltip
              title="Hi there! I'm eMiL, the proud mascot of the DLSTR ML model security attack aggregate tool. I'm here to help guide you through the steps, so feel free to hover over me for assistance."
              color={"#39f"}
              visible={dummyTooltipVisible}
              key={"#dummy"}
            >
              <img
                style={{ position: "absolute", width: 167, height: 164 }}
                src="https://www.dropbox.com/s/t8uks5kjy6dj7rm/eMiL_blank.png?raw=1"
                alt="eMiL blank"
                onMouseEnter={() => {
                  setMainTooltipVisible(true);
                  setDummyTooltipVisible(false);
                }}
                onMouseLeave={() => setMainTooltipVisible(false)}
              />
            </Tooltip>
          </a>
        </Content>

        <Footer />
      </Layout>
    </div>
  );
}
