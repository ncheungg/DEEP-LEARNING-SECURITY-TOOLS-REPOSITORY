import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import { Col, Layout, Typography } from "antd";
import ContactForm from "@/component/ContactForm/ContactForm";

const { Title } = Typography;

const { Content } = Layout;

export default function Contact() {
  return (
    <Layout>
      <Navbar />
      <Col span={18} offset={3}>
        <Content
          style={{
            backgroundColor: "white",
            minHeight: "calc(100vh - 4em)",
            padding: "3em",
          }}
        >
          <Title>Contact Us</Title>
          <Title level={2} style={{ paddingBottom: "1em" }}>
            We will try to get back to you within 2-3 business days
          </Title>

          <ContactForm />
        </Content>
        <Footer />
      </Col>
    </Layout>
  );
}
