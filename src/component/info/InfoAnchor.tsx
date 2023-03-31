import React from "react";
import { Anchor, Row, Col, Card, Divider, Typography, Tooltip } from "antd";
import { GithubOutlined, LinkOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text, Link } = Typography;

const InfoAnchor: React.FC = () => {
  return (
    <div>
      <Title id="docs-title" style={{ marginTop: "0px" }} level={1}>
        Aggregated Attack Library Documentation
      </Title>
      <Row>
        <Col span={16}>
          <Title id="foolbox" style={{ marginTop: "35px" }} level={2}>
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
              <b>Definition:</b> A simple implementation of the fast gradient-based adversarial attack. Allows L2 and L∞ order of the norms.
            </p>
            <p>
              <b>Parameters:</b>
              <ul>
                <li>Epsilons</li>
                <li>Model Lower Bound</li>
                <li>Model Upper Bound</li>
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
              <b>Parameters:</b>
              <ul>
                <li>Epsilons</li>
                <li>Model Lower Bound</li>
                <li>Model Upper Bound</li>
                <li>Order of the Norm</li>
                <li>Random Start</li>
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
              <b>Definition:</b> The basic iterative attack involves making small, incremental changes to the input data to create effective
              adversarial examples.
            </p>
            <p>
              <b>Parameters:</b>
              <ul>
                <li>Epsilons</li>
                <li>Model Lower Bound</li>
                <li>Model Upper Bound</li>
                <li>Order of the Norm</li>
                <li>Random Start</li>
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
              <b>Definition:</b> Samples gaussian noise with a fixed L2 size. Can include repeatedly adding to samples, clipping, or both.
            </p>
            <p>
              <b>Parameters:</b>
              <ul>
                <li>Epsilons</li>
                <li>Model Lower Bound</li>
                <li>Model Upper Bound</li>
                <li>Order of the Norm</li>
                <li>Attack Types</li>
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
              <b>Definition:</b> Samples uniform noise with a fixed order of the norm size. Can include repeatedly adding to samples,
              clipping, or both.
            </p>
            <p>
              <b>Parameters:</b>
              <ul>
                <li>Epsilons</li>
                <li>Model Lower Bound</li>
                <li>Model Upper Bound</li>
                <li>Order of the Norm</li>
                <li>Attack Types</li>
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
              <b>Definition:</b> Creates “negative images” by inverting the pixel values.
            </p>
            <p>
              <b>Parameters:</b>
              <ul>
                <li>Epsilons</li>
                <li>Model Lower Bound</li>
                <li>Model Upper Bound</li>
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
              <b>Definition:</b> Increases the amount of salt and pepper noise until the input is misclassified.
            </p>
            <p>
              <b>Parameters:</b>
              <ul>
                <li>Epsilons</li>
                <li>Model Lower Bound</li>
                <li>Model Upper Bound</li>
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
              <b>Definition:</b> Reduces the contrast of the input using a linear/binary search to find the smallest adversarial.
              perturbation
            </p>
            <p>
              <b>Parameters:</b>
              <ul>
                <li>Epsilons</li>
                <li>Model Lower Bound</li>
                <li>Model Upper Bound</li>
                <li>Search Types</li>
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
              <b>Parameters:</b>
              <ul>
                <li>Epsilons</li>
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
              <b>Definition:</b> A technique for generating adversarial examples by iteratively perturbing input data along the gradient
              direction until reaching a point within a specified distance from the original data that maximizes the loss of a target model.
            </p>
            <p>
              <b>Parameters:</b>
              <ul>
                <li>Epsilons</li>
                <li>Epsilon Step Size</li>
                <li>Order of the Norm (L2, LInf)</li>
                <li>Attack Iterations</li>
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
              <b>Definition:</b> A technique for generating adversarial examples by iteratively applying small perturbations to input data
              in the direction of the gradient of the loss with respect to the input until reaching a point that maximizes the loss of a
              target model.
            </p>
            <p>
              <b>Parameters:</b>
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
              <b>Definition:</b> Momentum iterative method adversarial attack is a variant of the basic iterative method that uses a
              momentum term to smooth the update direction and accelerate convergence towards the optimal adversarial example.
            </p>
            <p>
              <b>Parameters:</b>
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
              <b>Definition:</b> Madry et al adversarial attack is a powerful variant of the projected gradient descent method that uses a
              stronger constraint on the size of the perturbation and trains the model using adversarial examples generated with this
              technique to improve its robustness against future attacks.
            </p>
            <p>
              <b>Parameters:</b>
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
              <b>Definition:</b> Simultaneous Perturbation Stochastic Approximation (SPSA) adversarial attack is a black-box attack
              technique that estimates the gradient of the loss function using noisy samples and updates the input data with a step size
              that is adaptively adjusted to maximize the loss of the target model.
            </p>
            <p>
              <b>Parameters:</b>
              <ul>
                <li>Epsilon</li>
                <li>Model Lower Bound</li>
                <li>Model Upper Bound</li>
                <li>Order of the Norm</li>
              </ul>
            </p>
          </Card>
          <Title id="ml-privacy-meter" level={2}>
            ML Privacy Meter Attacks Library:
          </Title>
          <Card
            title="Population Attack"
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
              <b>Definition:</b> Attack that determines the ability of attackers to determine if a member is part of a machine learning
              model training dataset.
            </p>
            <p>
              <b>Parameters:</b>
              <ul>
                <li>Loss Function</li>
                <li>Number of classes</li>
              </ul>
            </p>
          </Card>
          {/* <p style={{ height: "100vh" }}></p> */}
        </Col>
        <Col span={8} style={{ paddingLeft: "2em", marginTop: "35px" }}>
          <Anchor
            items={[
              // {
              //   key: "docs-title",
              //   href: "#docs-title"
              // }
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
          {/* <a style={{ position: "fixed", top: "55vh", paddingLeft: "20px" }}>
            <Tooltip
              title="Hi! I am AGGi, your ML attack aggregate documentation expert. I keep track of all the attacks run on our library's webapp, so you can focus on improving your models without worrying about the details! Hover over me whenever you want additional info about these attacks!"
              color={"#39f"}
              key={"#add"}
              placement="bottom"
            >
              <img style={{ width: 225, height: 164 }} src="https://www.dropbox.com/s/hq7k5niy4x7kuvj/X.png?raw=1" alt="eMiL" />
            </Tooltip>
          </a> */}
        </Col>
      </Row>
    </div>
  );
};

export default InfoAnchor;
