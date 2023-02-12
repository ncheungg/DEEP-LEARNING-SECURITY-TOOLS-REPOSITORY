import React from "react";
import { Anchor, Row, Col, Card, Divider, Typography, Tooltip } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text, Link } = Typography;

const InfoAnchor: React.FC = () => {
  return (
    <Row>
      <Col span={16}>
        <div id="part-1" style={{ height: "25vh", background: "rgba(255,0,0,0)" }}>
          <Card
            title="L2 Contrast Reduction Attack"
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
                <li>Epsilon</li>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-2" style={{ height: "25vh", background: "rgba(255,0,0,0)" }}>
          <Card
            title="L2 Contrast Reduction Attack"
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
                <li>Epsilon</li>
                <li>Step Size</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
        </div>
        <div id="part-3" style={{ height: "100vh", background: "rgba(255,0,0,0)" }}>
          <Card
            title="L2 Contrast Reduction Attack"
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
              title: "L2 Contrast Reduction Attack",
            },
            {
              key: "part-2",
              href: "#part-2",
              title: "Part 2",
            },
            {
              key: "part-3",
              href: "#part-3",
              title: "Part 3",
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default InfoAnchor;
