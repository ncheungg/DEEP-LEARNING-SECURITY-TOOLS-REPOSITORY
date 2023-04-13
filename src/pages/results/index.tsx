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
import { attackPromiseState, attackResultState } from "@/recoil/Atom";
import useStickyState from "utils/useStickyState";
import ResultsAnchor from "@/component/Charts/ResultsAnchor";
import { useRecoilValue } from "recoil";
import React, { useRef, useState, useMemo, useEffect } from "react";

const { Title } = Typography;

const { Content } = Layout;

export default function Home() {
  // const [attackResults, setAttackResults] = useStickyState(null, "attack-results");
  const attackResults = useRecoilValue(attackResultState);

  // console.log({ attackResults });
  console.log({ attackResults });

  const [originalAccuracy, setOriginalAccuracy] = useState(null);

  useEffect(() => {
    const originalResult = attackResults.find((result) => {
      return result.attackname === "original" && result.library === "original";
    });

    if (originalResult?.data?.accuracy) {
      setOriginalAccuracy(originalResult.data.accuracy);
    }
  }, [attackResults]);

  const showfoolboxSummary = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox");
  }, [attackResults]);

  const showCleverhansSummary = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans");
  }, [attackResults]);

  const showPrivacyMeterSummary = useMemo(() => {
    return attackResults.some((result) => result.library === "privacy meter");
  }, [attackResults]);

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
        <Title level={3}>The Original Accuracy of your inputted model is: {originalAccuracy}%</Title>

        <Title level={2}>Post-Attack Accuracy Summary Tables:</Title>

        {showfoolboxSummary && <Title level={3}>Foolbox:</Title>}
        {showfoolboxSummary && <FoolboxTable />}
        {showCleverhansSummary && <Title level={3}>CleverHans:</Title>}
        {showCleverhansSummary && <CleverhansTable />}

        {showPrivacyMeterSummary && <Title level={3}>ML Privacy Meter (Population Attack Audit Results):</Title>}
        {showPrivacyMeterSummary && <MLPrivacyMeterTable />}
        {/* <Title level={3}>Dioptra:</Title>
        <DioptraTable /> */}

        <br />
        <br />
        <br />
        <br />

        <Title level={2}>Post-Attack Accuracy Summary Graphs:</Title>
        {/* <Chart_1 /> */}

        {/* <Title>Advanced Summary of Attack Results:</Title> */}

        <br />

        <ResultsAnchor />
        <Button type="primary" icon={<HomeOutlined />} size="large" href="/">
          Return Home
        </Button>
      </Content>

      <Footer />
    </Layout>
  );
}
