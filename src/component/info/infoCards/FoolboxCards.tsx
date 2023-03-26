import React from "react";
import { Divider, List, Tooltip, Typography } from "antd";
import { Card, Space } from "antd";
import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";

const FoolboxCards: React.FC = () => (
  <>
    <Space direction="vertical" size={16} style={{ display: "flex" }}>
      <Card
        title="L2 Contrast Reduction Attack"
        // extra={
        //   <Tooltip title="Open page">
        //     <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
        //       <LinkOutlined style={{ color: "gray" }} />
        //     </a>
        //   </Tooltip>
        // }
      >
        <p>
          <b>Definition:</b> Reduces the contrast of the input using a perturbation of the given size.
        </p>
        <p>
          <b>Parameters:</b>
          <ul>
            <li>Epsilon</li>
            <li>Step Size</li>
            <li>Order of the Norm</li>
          </ul>
        </p>
      </Card>
      <Card
        title="Virtual Adversarial Attack"
        // extra={
        //   <Tooltip title="Open page">
        //     <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
        //       <LinkOutlined style={{ color: "gray" }} />
        //     </a>
        //   </Tooltip>
        // }
      >
        <p>
          <b>Definition:</b> Second-order gradient-based attack on the logits. 1 The attack calculates an untargeted adversarial
          perturbation by performing a approximated second order optimization step on the KL divergence between the unperturbed predictions
          and the predictions for the adversarial perturbation.
        </p>
        <p>
          <b>Parameters:</b>
          <ul>
            <li>Epsilon</li>
            <li>Step Size</li>
            <li>Order of the Norm</li>
          </ul>
        </p>
      </Card>
      <Card
        title="Decoupled Direction and Norm L2 Adversarial Attack"
        extra={
          <Tooltip title="Open page">
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
          <b>Parameters:</b>
          <ul>
            <li>Epsilon</li>
            <li>Order of the Norm</li>
          </ul>
        </p>
      </Card>
      <Card
        title="L2 Projected Gradient Descent Attack"
        // extra={
        //   <Tooltip title="Open page">
        //     <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
        //       <LinkOutlined style={{ color: "gray" }} />
        //     </a>
        //   </Tooltip>
        // }
      >
        <p>
          <b>Definition:</b> ...
        </p>
        <p>
          <b>Parameters:</b>
          <ul>
            <li>Step Size</li>
            <li>Order of the Norm</li>
          </ul>
        </p>
      </Card>
      <Card
        title="L2 Clipping Aware Additive Gaussian Noise Attack"
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
          <b>Parameters:</b>
          <ul>
            <li>Epsilon</li>
            <li>Step Size</li>
            <li>Order of the Norm</li>
          </ul>
        </p>
      </Card>
    </Space>
  </>
);

export default FoolboxCards;
