import React from "react";
import { Checkbox, Tooltip } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { InfoCircleOutlined, LinkOutlined, UserOutlined } from "@ant-design/icons";

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};

export default function FoolboxLib() {
  return (
    <>
      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Contrast Reduction Attack</b>
      </Checkbox>
      <Tooltip title="Reduces the contrast of the input using a perturbation of the given size.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Virtual Adversarial Attack</b>
      </Checkbox>
      <Tooltip title="Second-order gradient-based attack on the logits. 1 The attack calculates an untargeted adversarial perturbation by performing a approximated second order optimization step on the KL divergence between the unperturbed predictions and the predictions for the adversarial perturbation.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Decoupled Direction and Norm L2 Adversarial Attack</b>
      </Checkbox>
      <Tooltip title="">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/1811.09600" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Projected Gradient Descent Attack</b>
      </Checkbox>
      <Tooltip title="">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L-infinity Projected Gradient Descent Attack</b>
      </Checkbox>
      <Tooltip title="">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L-infinity Basic Iterative Method Attack</b>
      </Checkbox>
      <Tooltip title="">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Fast Gradient Method (FGM) Attack</b>
      </Checkbox>
      <Tooltip title="">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L-infinity Fast Gradient Sign Method (FGSM)</b>
      </Checkbox>
      <Tooltip title="">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Additive Gaussian Noise Attack</b>
      </Checkbox>
      <Tooltip title="Samples Gaussian noise with a fixed L2 size.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Additive Uniform Noise Attack</b>
      </Checkbox>
      <Tooltip title="Samples uniform noise with a fixed L2 size.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Clipping Aware Additive Gaussian Noise Attack</b>
      </Checkbox>
      <Tooltip title="Samples Gaussian noise with a fixed L2 size after clipping.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Clipping Aware Additive Uniform Noise Attack</b>
      </Checkbox>
      <Tooltip title="Samples uniform noise with a fixed L2 size after clipping.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="hhttps://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L-infinity Additive Uniform Noise Attack</b>
      </Checkbox>
      <Tooltip title="Samples uniform noise with a fixed L-infinity size.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Repeated Additive Gaussian Noise Attack</b>
      </Checkbox>
      <Tooltip title="Repeatedly samples Gaussian noise with a fixed L2 size.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Repeated Additive Uniform Noise Attack</b>
      </Checkbox>
      <Tooltip title="Repeatedly samples uniform noise with a fixed L2 size.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Clipping Aware Repeated Additive Gaussian Noise Attack</b>
      </Checkbox>
      <Tooltip title="Repeatedly samples Gaussian noise with a fixed L2 size after clipping.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Clipping Aware Repeated Additive Uniform Noise Attack</b>
      </Checkbox>
      <Tooltip title="Repeatedly samples uniform noise with a fixed L2 size after clipping.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/2007.07677" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L-infinity Repeated Additive Uniform Noise Attack</b>
      </Checkbox>
      <Tooltip title="Repeatedly samples uniform noise with a fixed L-infinity size.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Inversion Attack</b>
      </Checkbox>
      <Tooltip title="Creates “negative images” by inverting the pixel values.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/1607.02533" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Binary Search Contrast Reduction Attack</b>
      </Checkbox>
      <Tooltip title="Reduces the contrast of the input using a binary search to find the smallest adversarial perturbation.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Linear Search Contrast Reduction Attack</b>
      </Checkbox>
      <Tooltip title="Reduces the contrast of the input using a linear search to find the smallest adversarial perturbation.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Carlini Wagner Attack</b>
      </Checkbox>
      <Tooltip title="Implementation of the Carlini & Wagner L2 Attack.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/1608.04644" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Newton Fool Attack</b>
      </Checkbox>
      <Tooltip title="Implementation of the NewtonFool Attack.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a
        href="https://dl.acm.org/citation.cfm?id=3134635"
        target="_blank"
        rel="noreferrer noopener"
        style={{ color: "gray", paddingLeft: "8px" }}
      >
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>EAD Attack</b>
      </Checkbox>
      <Tooltip title="Implementation of the EAD Attack with EN Decision Rule.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a
        href="https://www.aaai.org/ocs/index.php/AAAI/AAAI18/paper/viewPaper/16893"
        target="_blank"
        rel="noreferrer noopener"
        style={{ color: "gray", paddingLeft: "8px" }}
      >
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Gaussian Blur Attack</b>
      </Checkbox>
      <Tooltip title="Blurs the inputs using a Gaussian filter with linearly increasing standard deviation.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Deep Fool Attack</b>
      </Checkbox>
      <Tooltip title="A simple and fast gradient-based adversarial attack. Implements the DeepFool L2 attack.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/1511.04599" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L-infinity Deep Fool Attack</b>
      </Checkbox>
      <Tooltip title="A simple and fast gradient-based adversarial attack. Implements the DeepFool L-infinity attack.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Salt & Pepper Noise Attack</b>
      </Checkbox>
      <Tooltip title="Increases the amount of salt and pepper noise until the input is misclassified.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Linear Search Blended Uniform Noise Attack</b>
      </Checkbox>
      <Tooltip title="Blends the input with a uniform noise input until it is misclassified.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Binarization Refinement Attack</b>
      </Checkbox>
      <Tooltip title="For models that preprocess their inputs by binarizing the inputs, this attack can improve adversarials found by other attacks. It does this by utilizing information about the binarization and mapping values to the corresponding value in the clean input or to the right side of the threshold.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="https://arxiv.org/abs/1811.09600" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Dataset Attack</b>
      </Checkbox>
      <Tooltip title="Draws randomly from the given dataset until adversarial examples for all inputs have been found.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      {/* <a href="" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a> */}
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Boundary Attack</b>
      </Checkbox>
      <Tooltip title="A powerful adversarial attack that requires neither gradients nor probabilities.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/1712.04248" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L0 Brendel Bethge Attack</b>
      </Checkbox>
      <Tooltip title="L0 variant of the Brendel & Bethge adversarial attack. This is a powerful gradient-based adversarial attack that follows the adversarial boundary (the boundary between the space of adversarial and non-adversarial images as defined by the adversarial criterion) to find the minimum distance to the clean image.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/1907.01003" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L1 Brendel Bethge Attack</b>
      </Checkbox>
      <Tooltip title="L1 variant of the Brendel & Bethge adversarial attack. This is a powerful gradient-based adversarial attack that follows the adversarial boundary (the boundary between the space of adversarial and non-adversarial images as defined by the adversarial criterion) to find the minimum distance to the clean image.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/1907.01003" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 Brendel Bethge Attack</b>
      </Checkbox>
      <Tooltip title="L2 variant of the Brendel & Bethge adversarial attack. This is a powerful gradient-based adversarial attack that follows the adversarial boundary (the boundary between the space of adversarial and non-adversarial images as defined by the adversarial criterion) to find the minimum distance to the clean image.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/1907.01003" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L-infinity Brendel Bethge Attack</b>
      </Checkbox>
      <Tooltip title="L-infinity variant of the Brendel & Bethge adversarial attack. This is a powerful gradient-based adversarial attack that follows the adversarial boundary (the boundary between the space of adversarial and non-adversarial images as defined by the adversarial criterion) to find the minimum distance to the clean image.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/1907.01003" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L0 FMN Attack</b>
      </Checkbox>
      <Tooltip title="The L0 Fast Minimum Norm adversarial attack, in Lp-norm.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/2102.12827" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L1 FMN Attack</b>
      </Checkbox>
      <Tooltip title="The L1 Fast Minimum Norm adversarial attack, in Lp-norm.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/2102.12827" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L2 FMN Attack</b>
      </Checkbox>
      <Tooltip title="The L2 Fast Minimum Norm adversarial attack, in Lp-norm.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/2102.12827" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>L-Infinity FMN Attack</b>
      </Checkbox>
      <Tooltip title="The L-Infinity Fast Minimum Norm adversarial attack, in Lp-norm.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/2102.12827" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />

      <Checkbox onChange={onChange} style={{ paddingBottom: "1.2em" }}>
        <b>Pointwise Attack</b>
      </Checkbox>
      <Tooltip title="Starts with an adversarial and performs a binary search between the adversarial and the original for each dimension of the input individually.">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
      <a href="https://arxiv.org/abs/1805.09190" target="_blank" rel="noreferrer noopener" style={{ color: "gray", paddingLeft: "8px" }}>
        <LinkOutlined />
      </a>
      <br />
    </>
  );
}
