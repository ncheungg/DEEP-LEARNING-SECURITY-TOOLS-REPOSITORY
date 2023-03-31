interface InputFiles {
  modelName: string;
  datasetName: string;
}

interface FoolboxGlobalParams extends InputFiles {
  lowerBound?: number;
  upperBound?: number;
  epsilonRange: [number, number];
  epsilonStep: number;
}

interface FoolboxDeepFoolAttackParams extends FoolboxGlobalParams {
  norms: string[];
}

interface AdditiveGaussianAttackParams extends FoolboxGlobalParams {
  attackTypes: string[];
}

interface AdditiveUniformAttackParams extends FoolboxGlobalParams {
  attackTypes: string[];
  norms: string[];
}

interface FastGradientAttackParams extends FoolboxGlobalParams {
  norms: string[];
  randomStart: boolean;
}

interface BasicIterativeAttackParams extends FoolboxGlobalParams {
  norms: string[];
  randomStart: boolean;
}

interface InversionAttackParams extends FoolboxGlobalParams {}

interface SaltAndPepperNoiseAttackParams extends FoolboxGlobalParams {}

interface ContrastReductionAttackParams extends FoolboxGlobalParams {
  attackTypes: string[];
}

export const runFoolboxDeepFoolAttack = async (params: FoolboxDeepFoolAttackParams) => {
  const { modelName, datasetName, lowerBound, upperBound, norms, epsilonRange, epsilonStep } = params;

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    epsilon_min: epsilonRange[0],
    epsilon_max: epsilonRange[1],
    epsilon_step: epsilonStep,
    model_lower_bound: lowerBound,
    model_upper_bound: upperBound,
    norms,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://foolbox-deep-fool-attack-zvax3lpy2q-uc.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "foolbox", attackname: "deep fool", data };
};

export const runFoolboxAdditiveGaussianAttack = async (params: AdditiveGaussianAttackParams) => {
  const { modelName, datasetName, lowerBound, upperBound, attackTypes, epsilonRange, epsilonStep } = params;

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    epsilon_min: epsilonRange[0],
    epsilon_max: epsilonRange[1],
    epsilon_step: epsilonStep,
    model_lower_bound: lowerBound,
    model_upper_bound: upperBound,
    attack_types: attackTypes,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://foolbox-additive-gaussian-noise-attack-zvax3lpy2q-uc.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "foolbox", attackname: "additive gaussian", data };
};

export const runFoolboxAdditiveUniformAttack = async (params: AdditiveUniformAttackParams) => {
  const { modelName, datasetName, lowerBound, upperBound, attackTypes, epsilonRange, epsilonStep, norms } = params;

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    epsilon_min: epsilonRange[0],
    epsilon_max: epsilonRange[1],
    epsilon_step: epsilonStep,
    model_lower_bound: lowerBound,
    model_upper_bound: upperBound,
    attack_types: attackTypes,
    norms,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://foolbox-additive-uniform-noise-attack-zvax3lpy2q-uc.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "foolbox", attackname: "additive uniform", data };
};

export const runFoolboxFastGradientAttack = async (params: FastGradientAttackParams) => {
  const { modelName, datasetName, lowerBound, upperBound, epsilonRange, epsilonStep, norms, randomStart } = params;

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    epsilon_min: epsilonRange[0],
    epsilon_max: epsilonRange[1],
    epsilon_step: epsilonStep,
    model_lower_bound: lowerBound,
    model_upper_bound: upperBound,
    random_start: randomStart,
    norms,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://foolbox-fast-gradient-attack-zvax3lpy2q-uc.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "foolbox", attackname: "fast gradient", data };
};

export const runFoolboxBasicIterativeAttack = async (params: BasicIterativeAttackParams) => {
  const { modelName, datasetName, lowerBound, upperBound, epsilonRange, epsilonStep, norms, randomStart } = params;

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    epsilon_min: epsilonRange[0],
    epsilon_max: epsilonRange[1],
    epsilon_step: epsilonStep,
    model_lower_bound: lowerBound,
    model_upper_bound: upperBound,
    random_start: randomStart,
    norms,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://foolbox-basic-iterative-attack-zvax3lpy2q-uc.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "foolbox", attackname: "basic iterative", data };
};

export const runFoolboxInversionAttack = async (params: InversionAttackParams) => {
  const { modelName, datasetName, lowerBound, upperBound, epsilonRange, epsilonStep } = params;

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    epsilon_min: epsilonRange[0],
    epsilon_max: epsilonRange[1],
    epsilon_step: epsilonStep,
    model_lower_bound: lowerBound,
    model_upper_bound: upperBound,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://foolbox-inversion-attack-zvax3lpy2q-uc.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "foolbox", attackname: "inversion", data };
};

export const runFoolboxSaltAndPepperAttack = async (params: SaltAndPepperNoiseAttackParams) => {
  const { modelName, datasetName, lowerBound, upperBound, epsilonRange, epsilonStep } = params;

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    epsilon_min: epsilonRange[0],
    epsilon_max: epsilonRange[1],
    epsilon_step: epsilonStep,
    model_lower_bound: lowerBound,
    model_upper_bound: upperBound,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://foolbox-salt-and-pepper-noise-attack-zvax3lpy2q-uc.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "foolbox", attackname: "salt and pepper", data };
};

export const runFoolboxContrastReductionAttack = async (params: ContrastReductionAttackParams) => {
  const { modelName, datasetName, lowerBound, upperBound, epsilonRange, epsilonStep, attackTypes } = params;

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    epsilon_min: epsilonRange[0],
    epsilon_max: epsilonRange[1],
    epsilon_step: epsilonStep,
    model_lower_bound: lowerBound,
    model_upper_bound: upperBound,
    attack_types: attackTypes,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://foolbox-contrast-reduction-attack-zvax3lpy2q-uc.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "foolbox", attackname: "contrast reduction", data };
};
