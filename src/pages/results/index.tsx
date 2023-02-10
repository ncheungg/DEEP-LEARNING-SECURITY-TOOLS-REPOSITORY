import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import { Button, Col, Layout, message, UploadProps } from "antd";
import { Typography } from "antd";
import { DownloadOutlined, HomeFilled, HomeOutlined, InboxOutlined } from "@ant-design/icons";
import Chart_1 from "@/component/Charts/Chart_1";
import CleverhansTable from "@/component/ResultTables/CleverhansTable";
import FoolboxTable from "@/component/ResultTables/FoolboxTable";
import MLPrivacyMeterTable from "@/component/ResultTables/MLPrivacyMeterTable";
import DioptraTable from "@/component/ResultTables/DioptraTable";

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
        <Title>Summary of Attack Results:</Title>
        <Title level={2}>Here&apos;s what we found during the model scanning process:</Title>
        <br />

        <Title level={2}>Post-Attack Accuracy Summary Tables:</Title>
        <Title level={3}>CleverHans:</Title>
        <CleverhansTable />
        <Title level={3}>Foolbox:</Title>
        <FoolboxTable />
        <Title level={3}>ML Privacy Meter (Population Attack Audit Results):</Title>
        <MLPrivacyMeterTable />
        <Title level={3}>Dioptra:</Title>
        <DioptraTable />

        <Button type="primary" icon={<DownloadOutlined />} size="large" /*href=""*/>
          Download PDF
        </Button>
        <br />
        <br />
        <br />
        <br />

        <Title level={2}>Post-Attack Accuracy Summary Graphs:</Title>
        <Chart_1 />

        <Title>Advanced Summary of Attack Results:</Title>

        <br />
        <Button type="primary" icon={<HomeOutlined />} size="large" href="/">
          Return Home
        </Button>
      </Content>

      <Footer />
    </Layout>
  );
}
