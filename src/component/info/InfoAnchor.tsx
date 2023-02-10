import React from "react";
import { Anchor, Row, Col, Card, Divider, Typography } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

const InfoAnchor: React.FC = () => {
  return (
    <Row>
      <Col span={16}>
        <div id="part-1" style={{ height: "20vh", background: "rgba(255,0,0,0.02)" }}>
          <Paragraph>
            <pre>L2 Contrast Reduction Attack</pre>
            <blockquote>
              {" "}
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
            </blockquote>
          </Paragraph>
        </div>
        <div id="part-2" style={{ height: "20vh", background: "rgba(0,255,0,0.02)" }}>
          <Paragraph>
            <pre>L2 Contrast Reduction Attack</pre>
            <blockquote>
              {" "}
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
            </blockquote>
          </Paragraph>
        </div>
        <div id="part-3" style={{ height: "20vh", background: "rgba(0,0,255,0.02)" }}>
          <Paragraph>
            <pre>L2 Contrast Reduction Attack</pre>
            <blockquote>
              {" "}
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
            </blockquote>
          </Paragraph>
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
