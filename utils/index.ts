export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// creates number range with bounds inclusive
export const range = (lowerBound: number, upperBound: number, step: number): number[] => {
  const arr: number[] = [];
  for (let i = lowerBound; i < upperBound; i += step) {
    arr.push(i);
  }
  return arr;
};
