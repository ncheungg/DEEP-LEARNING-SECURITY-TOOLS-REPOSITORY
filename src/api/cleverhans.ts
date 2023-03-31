import { range } from "utils";

interface InputFiles {
  modelName: string;
  datasetName: string;
}

interface CleverhansGlobalParams extends InputFiles {
  epsilonRange: [number, number];
  epsilonRangeStep: number;
  epsilonStep?: number;
  norm: string;
  attackIterations?: number;
}

interface FastGradientAttackParams extends CleverhansGlobalParams {}

interface ProjectedGradientDescentAttackParams extends CleverhansGlobalParams {}

interface BasicIterativeAttackParams extends CleverhansGlobalParams {}

interface MadryEtAlAttackParams extends CleverhansGlobalParams {}

interface MomentumIterativeAttackParams extends CleverhansGlobalParams {
  decayFactor?: number;
}

interface SpsaAttackParams extends CleverhansGlobalParams {}

export const runCleverhansFastGradientAttack = async (params: FastGradientAttackParams) => {
  const { modelName, datasetName, epsilonRange, epsilonRangeStep, norm } = params;

  const epsilons = range(epsilonRange[0], epsilonRange[1], epsilonRangeStep);

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    order_of_norm: norm,
    epsilons,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://cleverhans-fgm-zvax3lpy2q-ue.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "cleverhans", attackname: "fast gradient", data };
};

export const runCleverhansProjectedGradientDescentAttack = async (params: ProjectedGradientDescentAttackParams) => {
  const { modelName, datasetName, epsilonRange, epsilonRangeStep, norm, epsilonStep, attackIterations } = params;

  if (epsilonStep === undefined || attackIterations === undefined) return;

  const epsilons = range(epsilonRange[0], epsilonRange[1], epsilonRangeStep);

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    order_of_norm: norm,
    epsilons,
    epsilon_iter: epsilonStep,
    attack_iter: attackIterations,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://cleverhans-pgd-zvax3lpy2q-ue.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "cleverhans", attackname: "projected gradient descent", data };
};

export const runCleverhansBasicIterativeAttack = async (params: BasicIterativeAttackParams) => {
  const { modelName, datasetName, epsilonRange, epsilonRangeStep, norm, epsilonStep, attackIterations } = params;

  if (epsilonStep === undefined || attackIterations === undefined) return;

  const epsilons = range(epsilonRange[0], epsilonRange[1], epsilonRangeStep);

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    order_of_norm: norm,
    epsilons,
    epsilon_iter: epsilonStep,
    attack_iter: attackIterations,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://cleverhans-bim-zvax3lpy2q-ue.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "cleverhans", attackname: "basic iterative", data };
};

export const runCleverhansMadryEtAlAttack = async (params: MadryEtAlAttackParams) => {
  const { modelName, datasetName, epsilonRange, epsilonRangeStep, norm, epsilonStep, attackIterations } = params;

  if (epsilonStep === undefined || attackIterations === undefined) return;

  const epsilons = range(epsilonRange[0], epsilonRange[1], epsilonRangeStep);

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    order_of_norm: norm,
    epsilons,
    epsilon_iter: epsilonStep,
    attack_iter: attackIterations,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://cleverhans-mea-zvax3lpy2q-ue.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "cleverhans", attackname: "madry et al", data };
};

export const runCleverhansMomentumIterativeAttack = async (params: MomentumIterativeAttackParams) => {
  const { modelName, datasetName, epsilonRange, epsilonRangeStep, norm, epsilonStep, attackIterations, decayFactor } = params;

  if (epsilonStep === undefined || attackIterations === undefined || decayFactor === undefined) return;

  const epsilons = range(epsilonRange[0], epsilonRange[1], epsilonRangeStep);

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    order_of_norm: norm,
    epsilons,
    epsilon_iter: epsilonStep,
    attack_iter: attackIterations,
    decay_factor: decayFactor,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://cleverhans-mim-zvax3lpy2q-ue.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "cleverhans", attackname: "momentum iterative", data };
};

export const runCleverhansSpsaAttack = async (params: SpsaAttackParams) => {
  const { modelName, datasetName, epsilonRange, epsilonRangeStep, attackIterations } = params;

  if (attackIterations === undefined) return;

  const epsilons = range(epsilonRange[0], epsilonRange[1], epsilonRangeStep);

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    epsilons,
    attack_iter: attackIterations,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://cleverhans-spsa-zvax3lpy2q-ue.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "cleverhans", attackname: "spsa", data };
};
