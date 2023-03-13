import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import { Button, Col, Layout, message, UploadProps } from "antd";
import { Typography } from "antd";
import AttackSteps from "@/component/Steps/AttackSteps";

const { Title } = Typography;

const { Content } = Layout;

export default function Home() {
  return (
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
        {/* <Title>Let&apos;s get started!</Title> */}
        <Title level={2}>Follow the steps below to scan your machine learning model</Title>
        <br />
        <br />
        {/* <Title level={3} style={{ paddingTop: "1em" }}>
          Step 1: Upload your machine learning model below
        </Title>
        <UploadModel />

        <Title level={3} style={{ paddingTop: "1em" }}>
          Step 2: Upload your test file
        </Title>
        <UploadTest />

        <Title level={3} style={{ paddingTop: "1em", paddingBottom: "0.5em" }}>
          Step 3: Select attacks to run on your model (Include Parameters)
        </Title>


        <Title level={3} style={{ paddingTop: "1em", paddingBottom: "0.5em" }}>
          Step 4: Submit the form to start attacking model
        </Title>
        <FormSubmitBtn />

        <Title>ALTERNATE IMPLEMENTATION:</Title> */}
        <AttackSteps />
      </Content>

      <Footer />
    </Layout>
  );
}
