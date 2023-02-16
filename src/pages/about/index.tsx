import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import { Button, Col, Layout } from "antd";
import { Typography } from "antd";
import { CloudSyncOutlined, DownloadOutlined } from "@ant-design/icons";
import InfoAccordion from "@/component/info/InfoCollapse";
import InfoCollapse from "@/component/info/InfoCollapse";
import InfoAnchor from "@/component/info/InfoAnchor";

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
        {/* <Title>Attacks Library Documentation</Title>
        <Title level={2}>Browse through the available attacks below:</Title>
        <br /> */}

        {/* <Button type="primary" icon={<CloudSyncOutlined />} size="large" href="/">
          Get Started
        </Button> */}

        {/* <br />
        <br />
        <br />
        <br />
        <Title level={3}>
          We utilize the web&apos;s most trusted machine model security APIs to ensure that you get the most thorough error detection.
        </Title>
        <br />
        <Title level={3}>
          With our file scanning features, you will never need to go through rigorous testing and troubleshooting. It is handled here from
          within our webapp.
        </Title>
        <br />
        <Title level={3}>
          With our website&apos;s sleek and simple design, you can quickly scan your machine learning models with ease.
        </Title> */}

        {/* <InfoCollapse /> */}
        <InfoAnchor />
      </Content>

      <Footer />
    </Layout>
  );
}
