// export const fetchTimeout = (url: string, ms: number, { signal, ...options } = {}) => {
//   const controller = new AbortController();
//   const promise = fetch(url, { signal: controller.signal, ...options });
//   if (signal) signal.addEventListener("abort", () => controller.abort());
//   const timeout = setTimeout(() => controller.abort(), ms);
//   return promise.finally(() => clearTimeout(timeout));
// };

// const controller = new AbortController();

// document.querySelector("button.cancel").addEventListener("click", () => controller.abort());

// fetchTimeout("example.json", 5000, { signal: controller.signal })
//   .then((response) => response.json())
//   .then(console.log)
//   .catch((error) => {
//     if (error.name === "AbortError") {
//       // fetch aborted either due to timeout or due to user clicking the cancel button
//     } else {
//       // network error or json parsing error
//     }
//   });

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
