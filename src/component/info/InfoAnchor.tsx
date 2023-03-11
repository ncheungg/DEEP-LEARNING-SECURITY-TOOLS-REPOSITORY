import React from "react";
import { Anchor, Row, Col, Card, Divider, Typography, Tooltip } from "antd";
import { GithubOutlined, LinkOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text, Link } = Typography;

const InfoAnchor: React.FC = () => {
  return (
    <Row>
      <Col span={16}>
        <Title id="foolbox" level={2}>
          Foolbox Attacks Library
        </Title>
        <Card
          id="foolbox-deep-fool-attack"
          title="Deep Fool Attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */ placement="bottom">
              <a href="https://arxiv.org/abs/1511.04599" target="_blank" rel="noreferrer noopener">
                <LinkOutlined style={{ color: "gray" }} />
              </a>
              <a
                href="https://github.com/bethgelab/foolbox/blob/master/foolbox/attacks/deepfool.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
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
        <Card
          title="Fast Gradient Attack"
          id="foolbox-fast-gradient-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */ placement="bottom">
              {/* <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/bethgelab/foolbox/blob/master/foolbox/attacks/fast_gradient_method.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
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
        <Card
          title="Basic Iterative Attack"
          id="foolbox-basic-iterative-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */ placement="bottom">
              {/* <a href="https://arxiv.org/abs/1811.09600" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/bethgelab/foolbox/blob/master/foolbox/attacks/basic_iterative_method.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
              </a>
            </Tooltip>
          }
        >
          <p>
            <b>Definition:</b> ?
          </p>
          <p>
            <b>Parameters:</b>{" "}
            <ul>
              <li>Epsilon</li>
              <li>Order of the Norm</li>
            </ul>
          </p>
        </Card>
        <Card
          title="Additive Gaussian Noise Attack"
          id="foolbox-additive-gaussian-noise-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */ placement="bottom">
              <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                <LinkOutlined style={{ color: "gray" }} />
              </a>
              <a
                href="https://github.com/bethgelab/foolbox/blob/master/foolbox/attacks/additive_noise.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
              </a>
            </Tooltip>
          }
        >
          <p>
            <b>Definition:</b> ?
          </p>
          <p>
            <b>Parameters:</b>{" "}
            <ul>
              <li>Step Size</li>
              <li>Order of the Norm</li>
            </ul>
          </p>
        </Card>
        <Card
          title="Additive Uniform Noise Attack"
          id="foolbox-additive-uniform-noise-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */ placement="bottom">
              <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                <LinkOutlined style={{ color: "gray" }} />
              </a>
              <a
                href="https://github.com/bethgelab/foolbox/blob/master/foolbox/attacks/additive_noise.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
              </a>
            </Tooltip>
          }
        >
          <p>
            <b>Definition:</b> ?
          </p>
          <p>
            <b>Parameters:</b>{" "}
            <ul>
              <li>Step Size</li>
              <li>Order of the Norm</li>
            </ul>
          </p>
        </Card>
        <Card
          title="Inversion Attack"
          id="foolbox-inversion-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */>
              {/* <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/bethgelab/foolbox/blob/master/foolbox/attacks/inversion.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
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
        <Card
          title="Salt & Pepper Noise Attack"
          id="foolbox-salt-and-pepper-noise-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */>
              {/* <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/bethgelab/foolbox/blob/master/foolbox/attacks/saltandpepper.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
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
        <Card
          title="Contrast Reduction Attack"
          id="foolbox-contrast-reduction-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */>
              {/* <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/bethgelab/foolbox/blob/master/foolbox/attacks/contrast.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
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
        <Title id="cleverhans" level={2}>
          CleverHans Attacks Library:
        </Title>
        <Card
          title="Fast Gradient Method Attack"
          id="cleverhans-fast-gradient-method-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */ placement="bottom">
              {/* <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/cleverhans-lab/cleverhans/blob/master/cleverhans/tf2/attacks/fast_gradient_method.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
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
              <li>Order of the Norm</li>
            </ul>
          </p>
        </Card>
        <Card
          title="Projected Gradient Descent Attack"
          id="cleverhans-projected-gradient-descent-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */ placement="bottom">
              {/* <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/cleverhans-lab/cleverhans/blob/master/cleverhans/tf2/attacks/fast_gradient_method.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
              </a>
            </Tooltip>
          }
        >
          <p>
            <b>Definition:</b> ?
          </p>
          <p>
            <b>Parameters:</b>{" "}
            <ul>
              <li>?</li>
            </ul>
          </p>
        </Card>
        <Card
          title="
            Basic Iterative Method Attack"
          id="cleverhans-basic-iterative-method-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */ placement="bottom">
              {/* <a href="https://arxiv.org/abs/1811.09600" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/cleverhans-lab/cleverhans/blob/master/cleverhans/tf2/attacks/basic_iterative_method.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
              </a>
            </Tooltip>
          }
        >
          <p>
            <b>Definition:</b> ?
          </p>
          <p>
            <b>Parameters:</b>{" "}
            <ul>
              <li>Epsilon</li>
              <li>Epsilon Step Size</li>
              <li>Attack Iterations</li>
              <li>Order of the Norm</li>
            </ul>
          </p>
        </Card>
        <Card
          title="Momentum Iterative Method Attack"
          id="cleverhans-momentum-iterative-method-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */ placement="bottom">
              {/* <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/cleverhans-lab/cleverhans/blob/master/cleverhans/tf2/attacks/momentum_iterative_method.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
              </a>
            </Tooltip>
          }
        >
          <p>
            <b>Definition:</b> ?
          </p>
          <p>
            <b>Parameters:</b>{" "}
            <ul>
              <li>Epsilon</li>
              <li>Epsilon Step Size</li>
              <li>Attack Iterations</li>
              <li>Order of the Norm</li>
              <li>Decay Factor</li>
            </ul>
          </p>
        </Card>
        <Card
          title="Madry Et Al Method Attack"
          id="cleverhans-madry-et-al-method-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */>
              {/* <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/cleverhans-lab/cleverhans/blob/master/cleverhans/tf2/attacks/madry_et_al.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
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
              <li>Epsilon Step Size</li>
              <li>Attack Iterations</li>
              <li>Order of the Norm</li>
            </ul>
          </p>
        </Card>
        <Card
          title="SPSA Attack"
          id="cleverhans-spsa-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */>
              {/* <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/bethgelab/foolbox/blob/master/foolbox/attacks/contrast.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
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
        <Title id="ml-privacy-meter" level={2}>
          ML Privacy Meter Attacks Library:
        </Title>
        <Card
          title="SPSA Attack"
          id="ml-privacy-meter-population-attack"
          style={{ marginBottom: "15px" }}
          extra={
            <Tooltip /* title="Open Page" */>
              {/* <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener">
                  <LinkOutlined style={{ color: "gray" }} />
                </a> */}
              <a
                href="https://github.com/bethgelab/foolbox/blob/master/foolbox/attacks/contrast.py"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubOutlined style={{ color: "gray", paddingLeft: "8px" }} />
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

export default InfoAnchor;
