import React from "react";
import BasicIterativeForm from "../AttackForms/BasicIterativeForm";
import FastGradientForm from "../AttackForms/FastGradientForm";
import MadryetalForm from "../AttackForms/MadryetalForm";
import MomentumIterativeForm from "../AttackForms/MomentumIterativeForm";
import SPSAForm from "../AttackForms/SPSAForm";

export default function CleverhansLib() {
  return (
    <>
      <FastGradientForm />
      <BasicIterativeForm />
      <MomentumIterativeForm />
      <MadryetalForm />
      <SPSAForm />
    </>
  );
}
