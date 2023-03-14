import { atom } from "recoil";

export const modelNameState = atom({
  key: "modelNameState",
  default: "test_model",
});

export const datasetNameState = atom({
  key: "datasetNameState",
  default: "cifar10",
});
