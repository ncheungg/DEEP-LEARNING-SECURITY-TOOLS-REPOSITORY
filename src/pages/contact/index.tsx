import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import { Col, Layout, Typography } from "antd";
import ContactForm from "@/component/ContactForm/ContactForm";
import FAQAccordion from "@/component/ContactForm/QuestionForm";

const { Title } = Typography;

const { Content } = Layout;

export default function Contact() {
  return (
    <Layout style={{ alignItems: "center" }}>
      <Navbar />

      <Content
        style={{
          backgroundColor: "white",
          // backgroundImage=
          minHeight: "calc(100vh - 4em)",
          padding: "3em",
          width: "65em",
        }}
      >
        <Title level={2} style={{ paddingBottom: "1em" }}>
          Frequently Asked Questions
        </Title>

        <FAQAccordion />

        <Title level={3} style={{ paddingBottom: "0em", paddingTop: "2em" }}>
          Don&apos;t see your question? Contact us Here!
        </Title>

        <ContactForm />
      </Content>
      <Footer />
    </Layout>
  );
}
