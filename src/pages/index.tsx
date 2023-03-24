import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import { Button, Layout } from "antd";
import { Typography, Row, Col } from "antd";
import { CloudSyncOutlined, DownloadOutlined, InfoCircleOutlined, MailOutlined } from "@ant-design/icons";
import ThreeD from "@/component/3D/ThreeD";

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
          //justifyContent: "center !important",
          //width: "80%"
        }}
      >
        <Title>
          Welcome to <span style={{ color: "#0078f9" }}>DLSTR</span>
        </Title>

        <Title
          level={2}
          style={
            {
              /*paddingBottom: "1rem"*/
            }
          }
        >
          Robust and convenient machine learning model security and privacy testing
        </Title>
        <ThreeD />
        {/* <a style={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <img style={{ width: 300, height: 300 }} src="https://www.dropbox.com/s/98kvl2h5ggzxi7y/Untitled_Artwork.png?raw=1" alt="Logo" />
        </a> */}

        <Button type="primary" icon={<CloudSyncOutlined />} size="large" href="/attack">
          Start Testing
        </Button>

        <Title level={3} style={{ paddingTop: "2rem" }} /*style={{ color: "blue" }}*/>
          Tutorial
        </Title>
        <Title level={4} style={{ paddingBottom: "1rem" }}>
          An end to end tutorial on how to test your Tensorflow models
        </Title>
        <Button type="primary" icon={<InfoCircleOutlined />} size="large" href="/tutorial">
          Learn More
        </Button>

        <Title level={3} style={{ paddingTop: "2rem" }} /*style={{ color: "blue" }}*/>
          Documentation
        </Title>
        <Title level={4} style={{ paddingBottom: "1rem" }}>
          Learn more about the security and privacy attacks we use
        </Title>
        <Button type="primary" icon={<InfoCircleOutlined />} size="large" href="/documentation">
          Read The Docs
        </Button>

        <Title level={3} style={{ paddingTop: "2rem" }} /*style={{ color: "blue" }}*/>
          Contact Us
        </Title>
        <Title level={4} style={{ paddingBottom: "1rem" }}>
          Have any questions or concerns? Contact us today and we will be sure to reach out to you
        </Title>
        <Button type="primary" icon={<MailOutlined />} size="large" href="/contact">
          Contact
        </Button>
      </Content>

      <Footer />
    </Layout>
  );
}
