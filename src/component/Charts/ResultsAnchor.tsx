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
import {
  FastGradientChart,
  ProjectedGradientDescentChart,
  BasicIterativeChart,
  MadrytEtAlChart,
  SPSAChart,
  MomentumIterativeChart,
} from "./CleverhansCharts";
// import { FastGradientChart, ProjectedGradientDescentChart } from "./ChartsRedo_1";
// import { FoolboxChart } from "./FoolboxCharts";
import {
  FoolboxFastGradientChart,
  DeepFoolChart,
  FoolboxBasicIterativeChart,
  AdditiveUniformChart,
  AdditiveGaussianChart,
} from "./FoolboxCharts";
import CleverhansTable from "../ResultTables/CleverhansTable";
import FoolboxTable from "../ResultTables/FoolboxTable";
import { PrivacyMeterChart } from "./PrivacyMeterChart";
import { attackPromiseState, attackResultState } from "@/recoil/Atom";
import { useMemo } from "react";

// Chart.register(...registerables);
// ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const { Title, Paragraph, Text, Link } = Typography;

const ResultsAnchor = () => {
  const attackResults = useRecoilValue(attackResultState);

  console.log({ attackResults });

  const showfoolboxSummary = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox");
  }, [attackResults]);

  const showDeepFool = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "deep fool");
  }, [attackResults]);

  const showFoolboxFastGradient = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "fast gradient");
  }, [attackResults]);

  const showFoolboxBasicIterative = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "basic iterative");
  }, [attackResults]);

  const showAdditiveGaussian = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "additive gaussian");
  }, [attackResults]);

  const showAdditiveUniform = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "additive uniform");
  }, [attackResults]);

  const showInversionAttack = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "inversion");
  }, [attackResults]);

  const showSaltandPepperAttack = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "salt and pepper");
  }, [attackResults]);

  const showContrastReductionAttack = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "contrast reduction");
  }, [attackResults]);

  /////////////////////////

  const showCleverhansSummary = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans");
  }, [attackResults]);

  const showCleverHansBasicIterative = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "basic iterative");
  }, [attackResults]);

  const showCleverHansFastGradient = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "fast gradient");
  }, [attackResults]);

  const showCleverHansMadryEtAl = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "madry et al");
  }, [attackResults]);

  const showCleverHansMomentumIterative = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "momentum iterative");
  }, [attackResults]);

  const showCleverHansProjectedGradienDescent = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "projected gradient descent");
  }, [attackResults]);

  const showCleverHansSpsa = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "spsa");
  }, [attackResults]);

  /////////////////////////
  const showPrivacyMeterSummary = useMemo(() => {
    return attackResults.some((result) => result.library === "privacy meter");
  }, [attackResults]);

  const showPrivacyMeterPopulation = useMemo(() => {
    return attackResults.some((result) => result.library === "privacy meter" && result.attackname === "population");
  }, [attackResults]);

  return (
    <Row>
      <Col span={16}>
        {showfoolboxSummary && (
          <Title id="foolbox" level={2}>
            Foolbox Attacks Library
          </Title>
        )}
        {/* {showfoolboxSummary && (
          <Card id="Summary" title="Summary" style={{ marginBottom: "15px" }}>
            <p>A summary of the Foolbox Attack Results:</p>
          </Card>
        )} */}
        {/* <Card title="Fast Gradient Attack">
          <FastGradientChart height="300px" width="300px" />
        </Card> */}
        {showDeepFool && (
          <Card id="foolbox-deep-fool-attack" title="Deep Fool Attack" style={{ marginBottom: "15px" }}>
            <DeepFoolChart height="300px" width="300px" />
          </Card>
        )}
        {showFoolboxFastGradient && (
          <Card title="Fast Gradient Attack" id="foolbox-fast-gradient-attack" style={{ marginBottom: "15px" }}>
            <FoolboxFastGradientChart height="300px" width="300px" />
          </Card>
        )}
        {showFoolboxBasicIterative && (
          <Card title="Basic Iterative Attack" id="foolbox-basic-iterative-attack" style={{ marginBottom: "15px" }}>
            <FoolboxBasicIterativeChart height="300px" width="300px" />
          </Card>
        )}
        {showAdditiveGaussian && (
          <Card title="Additive Gaussian Noise Attack" id="foolbox-additive-gaussian-noise-attack" style={{ marginBottom: "15px" }}>
            <AdditiveGaussianChart height="300px" width="300px" />
          </Card>
        )}
        {showAdditiveUniform && (
          <Card title="Additive Uniform Noise Attack" id="foolbox-additive-uniform-noise-attack" style={{ marginBottom: "15px" }}>
            <AdditiveUniformChart height="300px" width="300px" />
          </Card>
        )}
        {showInversionAttack && <Card title="Inversion Attack" id="foolbox-inversion-attack" style={{ marginBottom: "15px" }}></Card>}
        {showSaltandPepperAttack && (
          <Card title="Salt & Pepper Noise Attack" id="foolbox-salt-and-pepper-noise-attack" style={{ marginBottom: "15px" }}></Card>
        )}
        {showContrastReductionAttack && (
          <Card title="Contrast Reduction Attack" id="foolbox-contrast-reduction-attack" style={{ marginBottom: "15px" }}></Card>
        )}
        {showCleverhansSummary && (
          <Title id="cleverhans" level={2}>
            CleverHans Attacks Library:
          </Title>
        )}
        {/* {showCleverhansSummary && (
          <Card id="CleverHansSummary" title="Summary" style={{ marginBottom: "15px" }}>
            <p>A summary of the CleverHans Attack Results:</p>
            <div className={styles.FoolboxSummaryChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
              <Bar data={data2} options={options2} height="300px" width="300px" />
            </div>
          </Card>
        )} */}
        {showCleverHansFastGradient && (
          <Card title="Fast Gradient Method Attack" id="cleverhans-fast-gradient-method-attack" style={{ marginBottom: "15px" }}>
            <FastGradientChart height="300px" width="300px" />
          </Card>
        )}
        {showCleverHansProjectedGradienDescent && (
          <Card
            title="Projected Gradient Descent Attack"
            id="cleverhans-projected-gradient-descent-attack"
            style={{ marginBottom: "15px" }}
          >
            <ProjectedGradientDescentChart height="300px" width="300px" />
          </Card>
        )}
        {showCleverHansBasicIterative && (
          <Card
            title="
            Basic Iterative Method Attack"
            id="cleverhans-basic-iterative-method-attack"
            style={{ marginBottom: "15px" }}
          >
            <BasicIterativeChart height="300px" width="300px" />
          </Card>
        )}
        {showCleverHansMomentumIterative && (
          <Card title="Momentum Iterative Method Attack" id="cleverhans-momentum-iterative-method-attack" style={{ marginBottom: "15px" }}>
            <MomentumIterativeChart height="300px" width="300px" />
          </Card>
        )}
        {showCleverHansMadryEtAl && (
          <Card title="Madry Et Al Method Attack" id="cleverhans-madry-et-al-method-attack" style={{ marginBottom: "15px" }}>
            <MadrytEtAlChart height="300px" width="300px" />
          </Card>
        )}
        {showCleverHansSpsa && (
          <Card title="SPSA Attack" id="cleverhans-spsa-attack" style={{ marginBottom: "15px" }}>
            <SPSAChart height="300px" width="300px" />
          </Card>
        )}
        {showPrivacyMeterSummary && (
          <Title id="ml-privacy-meter" level={2}>
            ML Privacy Meter Attacks Library:
          </Title>
        )}
        {showPrivacyMeterPopulation && (
          <Card title="Population Attack" id="ml-privacy-meter-population-attack" style={{ marginBottom: "15px" }}>
            <PrivacyMeterChart height="300px" width="300px" />
          </Card>
        )}
        {/* <p style={{ height: "100vh" }}></p> */}
      </Col>
      <Col span={8} style={{ paddingLeft: "2em" }}>
        <Anchor
          items={[
            ...(showfoolboxSummary
              ? [
                  {
                    key: "foolbox",
                    href: "#foolbox",
                    title: "Foolbox Attacks Library",
                    children: [
                      // ...(showfoolboxSummary
                      //   ? [
                      //       {
                      //         key: "Summary",
                      //         href: "#Summary",
                      //         title: "Summary",
                      //       },
                      //     ]
                      //   : []),
                      ...(showDeepFool
                        ? [
                            {
                              key: "foolbox-deep-fool-attack",
                              href: "#foolbox-deep-fool-attack",
                              title: "Deep Fool Attack",
                            },
                          ]
                        : []),

                      ...(showFoolboxFastGradient
                        ? [
                            {
                              key: "foolbox-fast-gradient-attack",
                              href: "#foolbox-fast-gradient-attack",
                              title: "Fast Gradient Attack",
                            },
                          ]
                        : []),
                      ...(showFoolboxBasicIterative
                        ? [
                            {
                              key: "foolbox-basic-iterative-attack",
                              href: "#foolbox-basic-iterative-attack",
                              title: "Basic Iterative Attack",
                            },
                          ]
                        : []),
                      ...(showAdditiveGaussian
                        ? [
                            {
                              key: "foolbox-additive-gaussian-noise-attack",
                              href: "#foolbox-additive-gaussian-noise-attack",
                              title: "Additive Gaussian Noise Attack",
                            },
                          ]
                        : []),
                      ...(showAdditiveUniform
                        ? [
                            {
                              key: "foolbox-additive-uniform-noise-attack",
                              href: "#foolbox-additive-uniform-noise-attack",
                              title: "Additive Uniform Noise Attack",
                            },
                          ]
                        : []),
                      ...(showInversionAttack
                        ? [
                            {
                              key: "foolbox-inversion-attack",
                              href: "#foolbox-inversion-attack",
                              title: "Inversion Attack",
                            },
                          ]
                        : []),
                      ...(showSaltandPepperAttack
                        ? [
                            {
                              key: "foolbox-salt-and-pepper-noise-attack",
                              href: "#foolbox-salt-and-pepper-noise-attack",
                              title: "Salt & Pepper Noise Attack",
                            },
                          ]
                        : []),
                      ...(showContrastReductionAttack
                        ? [
                            {
                              key: "foolbox-contrast-reduction-attack",
                              href: "#foolbox-contrast-reduction-attack",
                              title: "Contrast Reduction Attack",
                            },
                          ]
                        : []),
                    ].filter(Boolean),
                  },
                ]
              : []),
            ...(showCleverhansSummary
              ? [
                  {
                    key: "cleverhans",
                    href: "#cleverhans",
                    title: "CleverHans Attacks Library",
                    children: [
                      // ...(showCleverhansSummary
                      //   ? [
                      //       {
                      //         key: "CleverHansSummary",
                      //         href: "#CleverHansSummary",
                      //         title: "Summary",
                      //       },
                      //     ]
                      //   : []),
                      ...(showCleverHansFastGradient
                        ? [
                            {
                              key: "cleverhans-fast-gradient-method-attack",
                              href: "#cleverhans-fast-gradient-method-attack",
                              title: "Fast Gradient Method Attack",
                            },
                          ]
                        : []),
                      ...(showCleverHansProjectedGradienDescent
                        ? [
                            {
                              key: "cleverhans-projected-gradient-descent-attack",
                              href: "#cleverhans-projected-gradient-descent-attack",
                              title: "Projected Gradient Descent Attack",
                            },
                          ]
                        : []),
                      ...(showCleverHansBasicIterative
                        ? [
                            {
                              key: "cleverhans-basic-iterative-method-attack",
                              href: "#cleverhans-basic-iterative-method-attack",
                              title: "Basic Iterative Method Attack",
                            },
                          ]
                        : []),
                      ...(showCleverHansMomentumIterative
                        ? [
                            {
                              key: "cleverhans-momentum-iterative-method-attack",
                              href: "#cleverhans-momentum-iterative-method-attack",
                              title: "Momentum Iterative Method Attack",
                            },
                          ]
                        : []),
                      ...(showCleverHansMadryEtAl
                        ? [
                            {
                              key: "cleverhans-madry-et-al-method-attack",
                              href: "#cleverhans-madry-et-al-method-attack",
                              title: "Madry Et Al Method Attack",
                            },
                          ]
                        : []),
                      ...(showCleverHansSpsa
                        ? [
                            {
                              key: "cleverhans-spsa-attack",
                              href: "#cleverhans-spsa-attack",
                              title: "SPSA Attack",
                            },
                          ]
                        : []),
                    ].filter(Boolean),
                  },
                ]
              : []),
            ...(showPrivacyMeterSummary
              ? [
                  {
                    key: "ml-privacy-meter",
                    href: "#ml-privacy-meter",
                    title: "ML Privacy Meter Attacks Library",
                    children: [
                      // {
                      //   key: "MLSummary",
                      //   href: "#MLSummary",
                      //   title: "Summary",
                      // },
                      ...(showPrivacyMeterPopulation
                        ? [
                            {
                              key: "ml-privacy-meter-population-attack",
                              href: "#ml-privacy-meter-population-attack",
                              title: "Population Attack",
                            },
                          ]
                        : []),
                    ].filter(Boolean),
                  },
                ]
              : []),

            //
          ]}
        />
      </Col>
    </Row>
  );
};
export default ResultsAnchor;
