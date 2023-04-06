interface InputFiles {
  modelName: string;
  datasetName: string;
}

interface PrivacyMeterPopulationAttackParams extends InputFiles {
  numClasses?: number;
  lossFunction?: string;
}

export const runPrivacyMeterPopulationAttack = async (params: PrivacyMeterPopulationAttackParams) => {
  const { modelName, datasetName, numClasses, lossFunction } = params;

  if (numClasses === undefined || lossFunction === undefined) return;

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
    num_classes: numClasses,
    loss_func: lossFunction,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://mlpm-population-attack-zvax3lpy2q-ue.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "privacy meter", attackname: "population", data };
};
