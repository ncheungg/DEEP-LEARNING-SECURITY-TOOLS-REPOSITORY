import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import { Button, Col, Layout } from "antd";
import { Typography } from "antd";
import { CloudSyncOutlined, DownloadOutlined } from "@ant-design/icons";

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
          maxWidth: "65em",
        }}
      >
        <Title>About Us</Title>
        <Title level={2}>To Robust and Convenient Machine-Learning Model Security Testing</Title>

        <Button type="primary" icon={<CloudSyncOutlined />} size="large" href="/">
          Get Started
        </Button>

        <br />
        <br />
        <br />
        <br />
        <Title level={3}>
          We utilize the web's most trusted machine model security APIs to ensure that you get the most thorough error detection.
        </Title>
        <br />
        <Title level={3}>
          With our file scanning features, you will never need to go through rigorous testing and troubleshooting. It is handled here from
          within our webapp.
        </Title>
        <br />
        <Title level={3}>With our website's sleek and simple design, you can quickly scan your machine learning models with ease.</Title>
      </Content>

      <Footer />
    </Layout>
  );
}
