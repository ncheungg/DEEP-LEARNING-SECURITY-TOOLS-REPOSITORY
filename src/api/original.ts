interface InputFiles {
  modelName: string;
  datasetName: string;
}

interface OriginalAttackParams extends InputFiles {}

export const runOriginalAttack = async (params: OriginalAttackParams) => {
  const { modelName, datasetName } = params;

  const requestBody = {
    model_name: modelName,
    dataset_name: datasetName,
  };
  const requestHeaders = { "Content-Type": "application/json" };
  const url = "https://original-data-zvax3lpy2q-ue.a.run.app";

  const res = await fetch(url, { method: "POST", mode: "cors", headers: requestHeaders, body: JSON.stringify(requestBody) });
  const data = await res.json();

  return { library: "original", attackname: "original", data };
};
