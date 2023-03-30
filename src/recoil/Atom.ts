import { atom } from "recoil";

export const modelNameState = atom({
  key: "modelNameState",
  // default: "test_model",
  default: "",
});

export const datasetNameState = atom({
  key: "datasetNameState",
  // default: "cifar10",
  default: "",
});

export const attackPromiseState = atom({
  key: "attackPromiseState",
  default: [] as Promise<any>[],
});

export const attackResultState = atom({
  key: "attackResultState",
  default: [] as any[],
});
