import React from "react";
import { Anchor, Row, Col, Card, Divider, Typography, Tooltip } from "antd";
import { GithubOutlined, LinkOutlined } from "@ant-design/icons";
import Charts_1 from "@/component/Charts/Chart_1";
import InfoAnchor from "../info/InfoAnchor";
import Chart_1 from "@/component/Charts/Chart_1";
import styles from "@/styles/Home.module.css";
import { Bar, Line, Scatter } from "react-chartjs-2";
import {
  data8,
  options8,
  data2,
  options2,
  inter,
  data,
  options,
  data7,
  options9,
  data9,
  options11,
  additiveGaussianData,
  additiveGaussianOptions,
  AdditiveUniformData,
  additiveUniformOptions,
  data4,
  options4,
} from "@/component/Charts/Chart_1";
import { useRecoilValue } from "recoil";
import { attackPromiseState } from "@/recoil/Atom";
// Chart.register(...registerables);
// ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const { Title, Paragraph, Text, Link } = Typography;

const ResultsAnchor = () => {
  const attackResults = useRecoilValue(attackPromiseState);

  console.log({ attackResults });

  return (
    <Row>
      <Col span={16}>
        <Title id="foolbox" level={2}>
          Foolbox Attacks Library
        </Title>
        <Card id="Summary" title="Summary" style={{ marginBottom: "15px" }}>
          <p>A summary of the Foolbox Attack Results:</p>
          <div className={styles.FoolboxSummaryChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
            <Bar data={data} options={options} height="300px" width="300px" />
          </div>
        </Card>
        <Card id="foolbox-deep-fool-attack" title="Deep Fool Attack" style={{ marginBottom: "15px" }}>
          <div className={styles.FoolboxDeepFoolAccuracyChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
            <Line data={data8} options={options8} height="300px" width="300px" />
          </div>
        </Card>
        <Card title="Fast Gradient Attack" id="foolbox-fast-gradient-attack" style={{ marginBottom: "15px" }}>
          <div className={styles.FoolboxFastGradientAccuracyChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
            <Line data={data7} options={options9} height="300px" width="300px" />
          </div>
        </Card>
        <Card title="Basic Iterative Attack" id="foolbox-basic-iterative-attack" style={{ marginBottom: "15px" }}>
          <div className={styles.FoolboxBasicIterativeAttackAccuracyChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
            <Line data={data9} options={options11} height="300px" width="300px" />
          </div>
        </Card>
        <Card title="Additive Gaussian Noise Attack" id="foolbox-additive-gaussian-noise-attack" style={{ marginBottom: "15px" }}>
          <div className={styles.FoolboxAdditiveGaussianAttackAccuracyChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
            <Line data={additiveGaussianData} options={additiveGaussianOptions} height="300px" width="300px" />
          </div>
        </Card>
        <Card title="Additive Uniform Noise Attack" id="foolbox-additive-uniform-noise-attack" style={{ marginBottom: "15px" }}>
          <div className={styles.FoolboxAdditiveUniformAttackAccuracyChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
            <Line data={AdditiveUniformData} options={additiveUniformOptions} height="300px" width="300px" />
          </div>
        </Card>
        <Card title="Inversion Attack" id="foolbox-inversion-attack" style={{ marginBottom: "15px" }}></Card>
        <Card title="Salt & Pepper Noise Attack" id="foolbox-salt-and-pepper-noise-attack" style={{ marginBottom: "15px" }}></Card>
        <Card title="Contrast Reduction Attack" id="foolbox-contrast-reduction-attack" style={{ marginBottom: "15px" }}></Card>
        <Title id="cleverhans" level={2}>
          CleverHans Attacks Library:
        </Title>
        <Card id="CleverHansSummary" title="Summary" style={{ marginBottom: "15px" }}>
          <p>A summary of the CleverHans Attack Results:</p>
          <div className={styles.FoolboxSummaryChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
            <Bar data={data2} options={options2} height="300px" width="300px" />
          </div>
        </Card>
        <Card title="Fast Gradient Method Attack" id="cleverhans-fast-gradient-method-attack" style={{ marginBottom: "15px" }}></Card>
        <Card
          title="Projected Gradient Descent Attack"
          id="cleverhans-projected-gradient-descent-attack"
          style={{ marginBottom: "15px" }}
        ></Card>
        <Card
          title="
            Basic Iterative Method Attack"
          id="cleverhans-basic-iterative-method-attack"
          style={{ marginBottom: "15px" }}
        ></Card>
        <Card
          title="Momentum Iterative Method Attack"
          id="cleverhans-momentum-iterative-method-attack"
          style={{ marginBottom: "15px" }}
        ></Card>
        <Card title="Madry Et Al Method Attack" id="cleverhans-madry-et-al-method-attack" style={{ marginBottom: "15px" }}></Card>
        <Card title="SPSA Attack" id="cleverhans-spsa-attack" style={{ marginBottom: "15px" }}></Card>
        <Title id="ml-privacy-meter" level={2}>
          ML Privacy Meter Attacks Library:
        </Title>
        <Card id="MLSummary" title="Summary" style={{ marginBottom: "15px" }}>
          <p>A summary of the ML Privacy Meter Attack Results:</p>
          <div className={styles.FoolboxSummaryChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
            <Line data={data4} options={options4} height="300px" width="250px" />
          </div>
        </Card>
        <Card title="SPSA Attack" id="ml-privacy-meter-population-attack" style={{ marginBottom: "15px" }}></Card>
        {/* <p style={{ height: "100vh" }}></p> */}
      </Col>
      <Col span={8} style={{ paddingLeft: "2em" }}>
        <Anchor
          items={[
            {
              key: "foolbox",
              href: "#foolbox",
              title: "Foolbox Attacks Library",
              children: [
                {
                  key: "Summary",
                  href: "#Summary",
                  title: "Summary",
                },
                {
                  key: "foolbox-deep-fool-attack",
                  href: "#foolbox-deep-fool-attack",
                  title: "Deep Fool Attack",
                },
                {
                  key: "foolbox-fast-gradient-attack",
                  href: "#foolbox-fast-gradient-attack",
                  title: "Fast Gradient Attack",
                },
                {
                  key: "foolbox-basic-iterative-attack",
                  href: "#foolbox-basic-iterative-attack",
                  title: "Basic Iterative Attack",
                },
                {
                  key: "foolbox-additive-gaussian-noise-attack",
                  href: "#foolbox-additive-gaussian-noise-attack",
                  title: "Additive Gaussian Noise Attack",
                },
                {
                  key: "foolbox-additive-uniform-noise-attack",
                  href: "#foolbox-additive-uniform-noise-attack",
                  title: "Additive Uniform Noise Attack",
                },
                {
                  key: "foolbox-inversion-attack",
                  href: "#foolbox-inversion-attack",
                  title: "Inversion Attack",
                },
                {
                  key: "foolbox-salt-and-pepper-noise-attack",
                  href: "#foolbox-salt-and-pepper-noise-attack",
                  title: "Salt & Pepper Noise Attack",
                },
                {
                  key: "foolbox-contrast-reduction-attack",
                  href: "#foolbox-contrast-reduction-attack",
                  title: "Contrast Reduction Attack",
                },
              ],
            },
            {
              key: "cleverhans",
              href: "#cleverhans",
              title: "CleverHans Attacks Library",
              children: [
                {
                  key: "CleverHansSummary",
                  href: "#CleverHansSummary",
                  title: "Summary",
                },
                {
                  key: "cleverhans-fast-gradient-method-attack",
                  href: "#cleverhans-fast-gradient-method-attack",
                  title: "Fast Gradient Method Attack",
                },
                {
                  key: "cleverhans-projected-gradient-descent-attack",
                  href: "#cleverhans-projected-gradient-descent-attack",
                  title: "Projected Gradient Descent Attack",
                },
                {
                  key: "cleverhans-basic-iterative-method-attack",
                  href: "#cleverhans-basic-iterative-method-attack",
                  title: "Basic Iterative Method Attack",
                },
                {
                  key: "cleverhans-momentum-iterative-method-attack",
                  href: "#cleverhans-momentum-iterative-method-attack",
                  title: "Momentum Iterative Method Attack",
                },
                {
                  key: "cleverhans-madry-et-al-method-attack",
                  href: "#cleverhans-madry-et-al-method-attack",
                  title: "Madry Et Al Method Attack",
                },
                {
                  key: "cleverhans-spsa-attack",
                  href: "#cleverhans-spsa-attack",
                  title: "SPSA Attack",
                },
              ],
            },
            {
              key: "ml-privacy-meter",
              href: "#ml-privacy-meter",
              title: "ML Privacy Meter Attacks Library",
              children: [
                {
                  key: "MLSummary",
                  href: "#MLSummary",
                  title: "Summary",
                },
                {
                  key: "ml-privacy-meter-population-attack",
                  href: "#ml-privacy-meter-population-attack",
                  title: "Population Attack",
                },
              ],
            },
          ]}
        />
      </Col>
    </Row>
  );
};
export default ResultsAnchor;
