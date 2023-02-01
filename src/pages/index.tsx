import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import { Button, Layout } from "antd";
import { Typography, Row, Col } from "antd";
import { CloudSyncOutlined, DownloadOutlined, InfoCircleOutlined, MailOutlined } from "@ant-design/icons";

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
        <Title /*style={{ color: "blue" }}*/>Welcome</Title>
        <Title level={2} style={{ paddingBottom: "1rem" }}>
          To robust and convenient machine learning model security testing
        </Title>
        <Button type="primary" icon={<CloudSyncOutlined />} size="large" href="/attack">
          Get Started
        </Button>

        {/* <Col span={18} offset={3}>
            <a style={{ padding: "1rem" }}>
              <img
                style={{ width: 400, height: 400 }}
                src="https://www.dropbox.com/s/98kvl2h5ggzxi7y/Untitled_Artwork.png?raw=1"
                alt="Logo"
              />
            </a>
          </Col> */}

        <Title level={3} style={{ paddingTop: "2rem" }} /*style={{ color: "blue" }}*/>
          About Us
        </Title>
        <Title level={4} style={{ paddingBottom: "1rem" }}>
          Find out more about our robust and convenient machine learning model security privacy testing
        </Title>
        <Button type="primary" icon={<InfoCircleOutlined />} size="large" href="/about">
          Learn More
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
