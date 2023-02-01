import React from "react";
import BasicIterativeForm from "../AttackForms/BasicIterativeForm";
import FastGradientForm from "../AttackForms/FastGradientForm";
import MadryetalForm from "../AttackForms/MadryetalForm";
import MomentumIterativeForm from "../AttackForms/MomentumIterativeForm";
import SPSAForm from "../AttackForms/SPSAForm";

export default function CleverhansRepoFormCollapse() {
  return (
    <>
      <FastGradientForm />
      <br />
      <BasicIterativeForm />
      <br />
      <MomentumIterativeForm />
      <br />
      <MadryetalForm />
      <br />
      <SPSAForm />
    </>
  );
}
