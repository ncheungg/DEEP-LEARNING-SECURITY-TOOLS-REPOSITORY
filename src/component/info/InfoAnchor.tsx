import React from "react";
import { Anchor, Row, Col, Card, Divider, Typography, Tooltip } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text, Link } = Typography;

const InfoAnchor: React.FC = () => {
  return (
    <Row>
      <Col span={16}>
        <div id="part-1" style={{ height: "4.5em", background: "rgba(255,0,0,0)" }}>
          <Title level={2}>Foolbox Attacks Library:</Title>
        </div>
        <div id="part-1-1" style={{ height: "22em", background: "rgba(255,0,0,0)" }}>
          <Card
            title="Deep Fool Attack"
            extra={
              <Tooltip title="Open page" placement="bottom">
                <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> Reduces the contrast of the input using a perturbation of the given size.
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Range of Epsilon</li>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-1-2" style={{ height: "26.75em", background: "rgba(255,0,0,0)" }}>
          <Card
            title="Fast Gradient Attack"
            extra={
              <Tooltip title="Open page" placement="bottom">
                <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> Second-order gradient-based attack on the logits. 1 The attack calculates an untargeted adversarial
              perturbation by performing a approximated second order optimization step on the KL divergence between the unperturbed
              predictions and the predictions for the adversarial perturbation.
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Epsilon</li>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-1-3" style={{ height: "20vh", background: "rgba(255,0,0,0)" }}>
          <Card
            title="Basic Iterative Attack"
            extra={
              <Tooltip title="Open page" placement="bottom">
                <a href="https://arxiv.org/abs/1811.09600" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> ...
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Epsilon</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-1-4" style={{ height: "20em", background: "rgba(255,0,0,0)" }}>
          <Card
            title="Additive Gaussian Noise Attack"
            extra={
              <Tooltip title="Open page" placement="bottom">
                <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> ...
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-1-5" style={{ height: "20em", background: "rgba(255,0,0,0)" }}>
          <Card
            title="Inversion Attack"
            extra={
              <Tooltip title="Open page">
                <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> Samples Gaussian noise with a fixed L2 size after clipping.
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Epsilon</li>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-1-6" style={{ height: "20em", background: "rgba(255,0,0,0)" }}>
          <Card
            title="Salt & Pepper Noise Attack"
            extra={
              <Tooltip title="Open page">
                <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> Samples Gaussian noise with a fixed L2 size after clipping.
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Epsilon</li>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-1-7" style={{ height: "20em", background: "rgba(255,0,0,0)" }}>
          <Card
            title="Contrast Reduction Attack"
            extra={
              <Tooltip title="Open page">
                <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> Samples Gaussian noise with a fixed L2 size after clipping.
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Epsilon</li>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-2" style={{ height: "4.5em", background: "rgba(255,0,0,0)" }}>
          <Title level={2}>CleverHans Attacks Library:</Title>
        </div>
        <div id="part-2-1" style={{ height: "26.75em", background: "rgba(255,0,0,0)" }}>
          <Card
            title="Fast Gradient Method Attack"
            extra={
              <Tooltip title="Open page" placement="bottom">
                <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> Second-order gradient-based attack on the logits. 1 The attack calculates an untargeted adversarial
              perturbation by performing a approximated second order optimization step on the KL divergence between the unperturbed
              predictions and the predictions for the adversarial perturbation.
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Epsilon</li>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-2-2" style={{ height: "20vh", background: "rgba(255,0,0,0)" }}>
          <Card
            title="
            Basic Iterative Method Attack"
            extra={
              <Tooltip title="Open page" placement="bottom">
                <a href="https://arxiv.org/abs/1811.09600" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> ...
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Epsilon</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-2-3" style={{ height: "20em", background: "rgba(255,0,0,0)" }}>
          <Card
            title="Momentum Iterative Method Attack"
            extra={
              <Tooltip title="Open page" placement="bottom">
                <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> ...
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-2-4" style={{ height: "20vh", background: "rgba(255,0,0,0)" }}>
          <Card
            title="Madry Et Al Method Attack"
            extra={
              <Tooltip title="Open page">
                <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> Samples Gaussian noise with a fixed L2 size after clipping.
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Epsilon</li>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-2-5" style={{ height: "20vh", background: "rgba(255,0,0,0)" }}>
          <Card
            title="SPSA Attack"
            extra={
              <Tooltip title="Open page">
                <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> Samples Gaussian noise with a fixed L2 size after clipping.
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Epsilon</li>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-3" style={{ height: "4.5em", background: "rgba(255,0,0,0)" }}>
          <Title level={2}>ML Privacy Meter Attacks Library:</Title>
        </div>
        <div id="part-3-1" style={{ height: "100vh", background: "rgba(255,0,0,0)" }}>
          <Card
            title="SPSA Attack"
            extra={
              <Tooltip title="Open page">
                <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a>
              </Tooltip>
            }
          >
            <p>
              <b>Definition:</b> Samples Gaussian noise with a fixed L2 size after clipping.
            </p>
            <p>
              <b>Parameters:</b>{" "}
              <ul>
                <li>Epsilon</li>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
      </Col>
      <Col span={8} style={{ paddingLeft: "2em" }}>
        <Anchor
          items={[
            {
              key: "part-1",
              href: "#part-1",
              title: "Foolbox Attacks Library",
              children: [
                {
                  key: "part-1-1",
                  href: "#part-1-1",
                  title: "Deep Fool Attack",
                },
                {
                  key: "part-1-2",
                  href: "#part-1-2",
                  title: "Fast Gradient Attack",
                },
                {
                  key: "part-1-3",
                  href: "#part-1-3",
                  title: "Basic Iterative Attack",
                },
                {
                  key: "part-1-4",
                  href: "#part-1-4",
                  title: "Additive Gaussian Noise Attack",
                },
                {
                  key: "part-1-5",
                  href: "#part-1-5",
                  title: "Inversion Attack",
                },
                {
                  key: "part-1-6",
                  href: "#part-1-6",
                  title: "Salt & Pepper Noise Attack",
                },
                {
                  key: "part-1-7",
                  href: "#part-1-7",
                  title: "Contrast Reduction Attack",
                },
              ],
            },
            {
              key: "part-2",
              href: "#part-2",
              title: "CleverHans Attacks Library",
              children: [
                {
                  key: "part-2-1",
                  href: "#part-2-1",
                  title: "Fast Gradient Method Attack",
                },
                {
                  key: "part-2-2",
                  href: "#part-2-2",
                  title: "Basic Iterative Method Attack",
                },
                {
                  key: "part-2-3",
                  href: "#part-2-3",
                  title: "Momentum Iterative Method Attack",
                },
                {
                  key: "part-2-4",
                  href: "#part-2-4",
                  title: "Madry Et Al Method Attack",
                },
                {
                  key: "part-2-5",
                  href: "#part-2-5",
                  title: "SPSA Attack",
                },
              ],
            },
            {
              key: "part-3",
              href: "#part-3",
              title: "ML Privacy Meter Attacks Library",
              children: [
                {
                  key: "part-3-1",
                  href: "#part-3-1",
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

export default InfoAnchor;
