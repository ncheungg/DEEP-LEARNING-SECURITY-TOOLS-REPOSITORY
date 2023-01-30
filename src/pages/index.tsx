import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import { Button, Layout } from "antd";
import { Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const { Content } = Layout;

export default function Home() {
  return (
    <Layout>
      <Navbar />

      <Content
        style={{
          backgroundColor: "white",
          minHeight: "calc(100vh - 4em)",
          padding: "3em",
        }}
      >
        <Title>Welcome</Title>
        <Title level={2}>To robust and convenient machine learning model security testing</Title>

        <Button type="primary" icon={<DownloadOutlined />} size="large">
          Get Started
        </Button>
      </Content>

      <Footer />
    </Layout>
  );
}
