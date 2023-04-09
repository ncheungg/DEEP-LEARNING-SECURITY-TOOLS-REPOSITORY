import { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Chart, Filler } from "chart.js";
import { attackPromiseState, attackResultState } from "@/recoil/Atom";
import { ChartData, ChartOptions, TooltipItem } from "chart.js/auto";

function DeepFoolChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const deepFoolResults = attackResults.find((result) => result.attackname === "deep fool" && result.library === "foolbox");

      const OriginalResults = attackResults.filter((result) => {
        return result.attackname === "original" && result.library === "original";
      });

      let originalAccuracyData = null;
      if (OriginalResults.length > 0) {
        const dataType = deepFoolResults.data["2"] ? "2" : "inf";
        const dataLength = deepFoolResults.data[dataType].accuracy.length;
        originalAccuracyData = Array.from({ length: dataLength }, () => OriginalResults[0].data.accuracy);
      }

      if (deepFoolResults) {
        const datasets: any[] = [];
        if (deepFoolResults.data["2"]) {
          datasets.push({
            label: "L2",
            data: deepFoolResults.data["2"].accuracy,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
          });
        }
        if (deepFoolResults.data["inf"]) {
          datasets.push({
            label: "Linf",
            data: deepFoolResults.data["inf"].accuracy,
            fill: false,
            backgroundColor: "rgba(192,75,75,0.4)",
            borderColor: "rgba(192,75,75,1)",
          });
        }
        if (OriginalResults) {
          datasets.push({
            label: "Accuracy of Original Model",
            data: originalAccuracyData,
            fill: false,
            backgroundColor: "rgba(0,192,75,0.4)",
            borderColor: "rgba(75,192,100,1)",
          });
        }

        // const epsilons = deepFoolResults.data["2"]?.epsilons ?? deepFoolResults.data["inf"].epsilons;
        // const accuracy = deepFoolResults[0].data.accuracy;
        // const originalAccuracy = OriginalResults[0].data.accuracy;
        // datasets.push({
        //   label: "Accuracy of Original Model",
        //   data: Array(epsilons.length).fill(originalAccuracy),
        //   fill: false,
        //   backgroundColor: "rgba(0,192,75,0.4)",
        //   borderColor: "rgba(75,192,100,1)",
        // });

        const data = {
          labels: deepFoolResults.data["2"]?.epsilons ?? deepFoolResults.data["inf"].epsilons,
          datasets: datasets,
          // {
          //   label: "Accuracy of Original Model",
          //   data: Array(epsilons.length).fill(originalAccuracy),
          //   fill: false,
          //   backgroundColor: "rgba(0,192,75,0.4)",
          //   borderColor: "rgba(75,192,100,1)",
          // },
        };

        const options: ChartOptions<"line"> = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              backgroundColor: "#000000",
              callbacks: {
                label: (tooltipItem: TooltipItem<"line">) => {
                  const datasetLabel = tooltipItem.dataset.label;
                  const rawValue = tooltipItem.raw as { x: number; y: number };
                  const x = tooltipItem.parsed.x;
                  const y = tooltipItem.parsed.y;
                  return `${datasetLabel} - Epsilon: ${x.toFixed(2)} Accuracy: ${(y * 1).toFixed(2)}%`;
                },
              },
            },
            legend: {},
            title: {
              display: true,
              text: ["Epsilon vs Accuracy: Deep Fool Attack", " ", "Order of the Norm:"],
            },
          },
          scales: {
            x: {
              type: "linear",
              // min: 0,
              //max: 0.1,
              title: {
                display: true,
                text: "Epsilon",
                font: {
                  size: 12,
                },
              },
            },
            y: {
              type: "linear",
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Accuracy (%)",
                font: {
                  size: 12,
                },
              },
            },
          },
        };

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(chartRef.current, {
          type: "line",
          data: data,
          options: options,
        });
      } else {
        console.log("No data available to render chart.");
      }
    }
  }, [attackResults]);

  return <canvas ref={chartRef} height={props.height} width={props.width} />;
}

function FoolboxFastGradientChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const foolboxFastGradientResults = attackResults.find(
        (result) => result.attackname === "fast gradient" && result.library === "foolbox"
      );

      const OriginalResults = attackResults.filter((result) => {
        return result.attackname === "original" && result.library === "original";
      });

      let originalAccuracyData = null;
      if (OriginalResults.length > 0) {
        const dataType = foolboxFastGradientResults.data["2"] ? "2" : "inf";
        const dataLength = foolboxFastGradientResults.data[dataType].accuracy.length;
        originalAccuracyData = Array.from({ length: dataLength }, () => OriginalResults[0].data.accuracy);
      }

      if (foolboxFastGradientResults) {
        const datasets: any[] = [];
        if (foolboxFastGradientResults.data["2"]) {
          datasets.push({
            label: "L2",
            data: foolboxFastGradientResults.data["2"].accuracy,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
          });
        }
        if (foolboxFastGradientResults.data["inf"]) {
          datasets.push({
            label: "Linf",
            data: foolboxFastGradientResults.data["inf"].accuracy,
            fill: false,
            backgroundColor: "rgba(192,75,75,0.4)",
            borderColor: "rgba(192,75,75,1)",
          });
        }
        if (OriginalResults) {
          datasets.push({
            label: "Accuracy of Original Model",
            data: originalAccuracyData,
            fill: false,
            backgroundColor: "rgba(0,192,75,0.4)",
            borderColor: "rgba(75,192,100,1)",
          });
        }

        const data = {
          labels: foolboxFastGradientResults.data["2"]?.epsilons ?? foolboxFastGradientResults.data["inf"].epsilons,
          datasets: datasets,
        };

        const options: ChartOptions<"line"> = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              backgroundColor: "#000000",
              callbacks: {
                label: (tooltipItem: TooltipItem<"line">) => {
                  const datasetLabel = tooltipItem.dataset.label;
                  const rawValue = tooltipItem.raw as { x: number; y: number };
                  const x = tooltipItem.parsed.x;
                  const y = tooltipItem.parsed.y;
                  return `${datasetLabel} - Epsilon: ${x.toFixed(2)} Accuracy: ${(y * 1).toFixed(2)}%`;
                },
              },
            },
            legend: {},
            title: {
              display: true,
              text: ["Epsilon vs Accuracy: Fast Gradient Attack", " ", "Order of the Norm:"],
            },
          },
          scales: {
            x: {
              type: "linear",
              // min: 0,
              //max: 0.1,
              title: {
                display: true,
                text: "Epsilon",
                font: {
                  size: 12,
                },
              },
            },
            y: {
              type: "linear",
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Accuracy (%)",
                font: {
                  size: 12,
                },
              },
            },
          },
        };

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(chartRef.current, {
          type: "line",
          data: data,
          options: options,
        });
      } else {
        console.log("No data available to render chart.");
      }
    }
  }, [attackResults]);

  return <canvas ref={chartRef} height={props.height} width={props.width} />;
}

function FoolboxBasicIterativeChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const FoolboxBasicIterativeResults = attackResults.find(
        (result) => result.attackname === "basic iterative" && result.library === "foolbox"
      );

      const OriginalResults = attackResults.filter((result) => {
        return result.attackname === "original" && result.library === "original";
      });

      let originalAccuracyData = null;
      if (OriginalResults.length > 0) {
        const dataType = FoolboxBasicIterativeResults.data["2"] ? "2" : "inf";
        const dataLength = FoolboxBasicIterativeResults.data[dataType].accuracy.length;
        originalAccuracyData = Array.from({ length: dataLength }, () => OriginalResults[0].data.accuracy);
      }

      if (FoolboxBasicIterativeResults) {
        const datasets: any[] = [];
        if (FoolboxBasicIterativeResults.data["2"]) {
          datasets.push({
            label: "L2",
            data: FoolboxBasicIterativeResults.data["2"].accuracy,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
          });
        }
        if (FoolboxBasicIterativeResults.data["inf"]) {
          datasets.push({
            label: "Linf",
            data: FoolboxBasicIterativeResults.data["inf"].accuracy,
            fill: false,
            backgroundColor: "rgba(192,75,75,0.4)",
            borderColor: "rgba(192,75,75,1)",
          });
        }
        if (OriginalResults) {
          datasets.push({
            label: "Accuracy of Original Model",
            data: originalAccuracyData,
            fill: false,
            backgroundColor: "rgba(0,192,75,0.4)",
            borderColor: "rgba(75,192,100,1)",
          });
        }

        const data = {
          labels: FoolboxBasicIterativeResults.data["2"]?.epsilons ?? FoolboxBasicIterativeResults.data["inf"].epsilons,
          datasets: datasets,
        };

        const options: ChartOptions<"line"> = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              backgroundColor: "#000000",
              callbacks: {
                label: (tooltipItem: TooltipItem<"line">) => {
                  const datasetLabel = tooltipItem.dataset.label;
                  const rawValue = tooltipItem.raw as { x: number; y: number };
                  const x = tooltipItem.parsed.x;
                  const y = tooltipItem.parsed.y;
                  return `${datasetLabel} - Epsilon: ${x.toFixed(2)} Accuracy: ${(y * 1).toFixed(2)}%`;
                },
              },
            },
            legend: {},
            title: {
              display: true,
              text: ["Epsilon vs Accuracy: Basic Iterative Attack", " ", "Order of the Norm:"],
            },
          },
          scales: {
            x: {
              type: "linear",
              // min: 0,
              //max: 0.1,
              title: {
                display: true,
                text: "Epsilon",
                font: {
                  size: 12,
                },
              },
            },
            y: {
              type: "linear",
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Accuracy (%)",
                font: {
                  size: 12,
                },
              },
            },
          },
        };

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(chartRef.current, {
          type: "line",
          data: data,
          options: options,
        });
      } else {
        console.log("No data available to render chart.");
      }
    }
  }, [attackResults]);

  return <canvas ref={chartRef} height={props.height} width={props.width} />;
}

// function AdditiveUniformChart(props: { height: string; width: string }) {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const attackResults = useRecoilValue(attackResultState);
//   const chartInstanceRef = useRef<Chart<"line"> | null>(null);

//   useEffect(() => {
//     if (chartRef && chartRef.current) {
//       const additiveUniformResults = attackResults.find(
//         (result) => result.attackname === "additive uniform" && result.library === "foolbox"
//       );

//       if (additiveUniformResults) {
//         const datasets: any[] = [];

//         Object.keys(additiveUniformResults.data["2"]).forEach((key) => {
//           const data = additiveUniformResults.data["2"][key];
//           datasets.push({
//             label: key,
//             data: data.accuracy,
//             fill: false,
//             backgroundColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(
//               Math.random() * 256
//             )},0.4)`,
//             borderColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},1)`,
//           });
//         });

//         const data = {
//           labels: additiveUniformResults.data["2"].additive.epsilons,
//           datasets: datasets,
//         };

// function AdditiveUniformChart(props: { height: string; width: string }) {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const attackResults = useRecoilValue(attackResultState);
//   const chartInstanceRef = useRef<Chart<"line"> | null>(null);

//   useEffect(() => {
//     if (chartRef && chartRef.current) {
//       const additiveUniformResults = attackResults.find(
//         (result) => result.attackname === "additive uniform" && result.library === "foolbox"
//       );

//       const OriginalResults = attackResults.filter((result) => {
//         return result.attackname === "original" && result.library === "original";
//       });

//       let originalAccuracyData = null;
//       if (OriginalResults.length > 0) {
//         const dataType = additiveUniformResults.data["2"] ? "2" : "inf";
//         const dataLength = additiveUniformResults.data[dataType].accuracy.length;
//         originalAccuracyData = Array.from({ length: dataLength }, () => OriginalResults[0].data.accuracy);
//       }

//       if (additiveUniformResults) {
//         const datasets: any[] = [];
//         if (additiveUniformResults.data["2"]) {
//           const additiveData = additiveUniformResults.data["2"].additive;
//           const clippingAwareAdditiveData = additiveUniformResults.data["2"]["clipping-aware-additive"];
//           const clippingAwareRepeatedAdditiveData = additiveUniformResults.data["2"]["clipping-aware-repeated-additive"];
//           const repeatedAdditiveData = additiveUniformResults.data["2"]["repeated-additive"];
//           const allData = [additiveData, clippingAwareAdditiveData, repeatedAdditiveData].filter(Boolean);

//           // const originalResults = attackResults.filter((result) => result.attackname === "original" && result.library === "original");
//           // let originalAccuracyData = null;
//           // if (originalResults.length > 0) {
//           //   const dataLength = allData[0].accuracy.length;
//           //   originalAccuracyData = Array.from({ length: dataLength }, () => originalResults[0].data.accuracy);
//           // }
//           datasets.push(
//             {
//               label: "Additive-L2",
//               data: additiveData.accuracy,
//               fill: false,
//               backgroundColor: "rgba(75,192,192,0.4)",
//               borderColor: "rgba(75,192,192,1)",
//             },
//             {
//               label: "Clipping Aware Additive-L2",
//               data: clippingAwareAdditiveData.accuracy,
//               fill: false,
//               backgroundColor: "rgba(192,75,75,0.4)",
//               borderColor: "rgba(192,75,75,1)",
//             },
//             {
//               label: "Clipping Aware Repeated Additive-L2",
//               data: clippingAwareRepeatedAdditiveData.accuracy,
//               fill: false,
//               backgroundColor: "rgba(75,192,75,0.4)",
//               borderColor: "rgba(75,192,75,1)",
//             },
//             {
//               label: "Repeated Additive-L2",
//               data: repeatedAdditiveData.accuracy,
//               fill: false,
//               backgroundColor: "rgba(192,192,75,0.4)",
//               borderColor: "rgba(192,192,75,1)",
//             }
//           );
//         }
//         if (additiveUniformResults.data["inf"]) {
//           const additiveDataInf = additiveUniformResults.data["inf"].additive;
//           const clippingAwareAdditiveDataInf = additiveUniformResults.data["inf"]["clipping-aware-additive"];
//           const clippingAwareRepeatedAdditiveDataInf = additiveUniformResults.data["inf"]["clipping-aware-repeated-additive"];
//           const repeatedAdditiveDataInf = additiveUniformResults.data["inf"]["repeated-additive"];
//           const allData = [
//             additiveDataInf,
//             clippingAwareAdditiveDataInf,
//             clippingAwareRepeatedAdditiveDataInf,
//             repeatedAdditiveDataInf,
//           ].filter(Boolean);
//           datasets.push(
//             {
//               label: "Additive-Linf",
//               data: additiveDataInf.accuracy,
//               fill: false,
//               backgroundColor: "rgba(75,75,192,0.4)",
//               borderColor: "rgba(75,75,192,1)",
//             },
//             {
//               label: "Repeated Additive-Linf",
//               data: repeatedAdditiveDataInf.accuracy,
//               fill: false,
//               backgroundColor: "rgba(192,75,192,0.4)",
//               borderColor: "rgba(192,75,192,1)",
//             },
//             {
//               label: "Clipping Aware Additive-L2",
//               data: clippingAwareAdditiveDataInf.accuracy,
//               fill: false,
//               backgroundColor: "rgba(192,75,75,0.4)",
//               borderColor: "rgba(192,75,75,1)",
//             },
//             {
//               label: "Clipping Aware Repeated Additive-L2",
//               data: clippingAwareRepeatedAdditiveDataInf.accuracy,
//               fill: false,
//               backgroundColor: "rgba(75,192,75,0.4)",
//               borderColor: "rgba(75,192,75,1)",
//             }
//           );
//         }

//         if (OriginalResults) {
//           datasets.push({
//             label: "Accuracy of Original Model",
//             data: originalAccuracyData,
//             fill: false,
//             backgroundColor: "rgba(0,192,75,0.4)",
//             borderColor: "rgba(75,192,100,1)",
//           });
//         }

//         const data = {
//           labels: additiveUniformResults.data["2"]?.additive.epsilons ?? additiveUniformResults.data["inf"].additive.epsilons,
//           datasets: datasets,
//         };

//         const options: ChartOptions<"line"> = {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             tooltip: {
//               backgroundColor: "#000000",
//               callbacks: {
//                 label: (tooltipItem: TooltipItem<"line">) => {
//                   const datasetLabel = tooltipItem.dataset.label;
//                   const rawValue = tooltipItem.raw as { x: number; y: number };
//                   const x = tooltipItem.parsed.x;
//                   const y = tooltipItem.parsed.y;
//                   return `${datasetLabel} - Epsilon: ${x.toFixed(2)} Accuracy: ${(y * 1).toFixed(2)}%`;
//                 },
//               },
//             },
//             legend: {},
//             title: {
//               display: true,
//               text: ["Epsilon vs Accuracy: Additive Uniform Attack", " ", "Order of the Norm:"],
//             },
//           },
//           scales: {
//             x: {
//               type: "linear",
//               // min: 0,
//               //max: 0.1,
//               title: {
//                 display: true,
//                 text: "Epsilon",
//                 font: {
//                   size: 12,
//                 },
//               },
//             },
//             y: {
//               type: "linear",
//               min: 0,
//               max: 100,
//               title: {
//                 display: true,
//                 text: "Accuracy (%)",
//                 font: {
//                   size: 12,
//                 },
//               },
//             },
//           },
//         };

//         if (chartInstanceRef.current) {
//           chartInstanceRef.current.destroy();
//         }

//         chartInstanceRef.current = new Chart(chartRef.current, {
//           type: "line",
//           data: data,
//           options: options,
//         });
//       } else {
//         console.log("No data available to render chart.");
//       }
//     }
//   }, [attackResults]);

//   return <canvas ref={chartRef} height={props.height} width={props.width} />;
// }
function AdditiveUniformChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const additiveUniformResults = attackResults.find(
        (result) => result.attackname === "additive uniform" && result.library === "foolbox"
      );

      const OriginalResults = attackResults.filter((result) => {
        return result.attackname === "original" && result.library === "original";
      });

      let originalAccuracyData = null;
      if (OriginalResults.length > 0) {
        const dataType = additiveUniformResults.data["2"] ? "2" : "inf";
        const dataLength = additiveUniformResults.data[dataType].accuracy.length;
        originalAccuracyData = Array.from({ length: dataLength }, () => OriginalResults[0].data.accuracy);
      }

      if (additiveUniformResults) {
        //   const datasets: any[] = [];
        //   if (additiveUniformResults.data["2"]) {
        //     const additiveData = additiveUniformResults.data["2"]["additive"];
        //     const clippingAwareAdditiveData = additiveUniformResults.data["2"]["clipping-aware-additive"];
        //     const clippingAwareRepeatedAdditiveData = additiveUniformResults.data["2"]["clipping-aware-repeated-additive"];
        //     const repeatedAdditiveData = additiveUniformResults.data["2"]["repeated-additive"];

        //     if (additiveUniformResults.data["2"]["additive"]) {
        //       datasets.push({
        //         label: "Additive",
        //         data: additiveUniformResults.data["2"]["additive"].accuracy,
        //         fill: false,
        //         backgroundColor: "rgba(75,192,192,0.4)",
        //         borderColor: "rgba(75,192,192,1)",
        //       });
        //     }
        // if (clippingAwareAdditiveData) {
        //   datasets.push({
        //     label: "Clipping Aware Additive",
        //     data: clippingAwareAdditiveData.accuracy,
        //     fill: false,
        //     backgroundColor: "rgba(75,192,192,0.4)",
        //     borderColor: "rgba(75,192,192,1)",
        //   });
        // }
        // if (clippingAwareRepeatedAdditiveData) {
        //   datasets.push({
        //     label: "Clipping Aware Repeated Additive",
        //     data: clippingAwareRepeatedAdditiveData.accuracy,
        //     fill: false,
        //     backgroundColor: "rgba(75,192,192,0.4)",
        //     borderColor: "rgba(75,192,192,1)",
        //   });
        // }
        // if (repeatedAdditiveData) {
        //   datasets.push({
        //     label: "Repeated Additive",
        //     data: repeatedAdditiveData.accuracy,
        //     fill: false,
        //     backgroundColor: "rgba(75,192,192,0.4)",
        //     borderColor: "rgba(75,192,192,1)",
        //   });
        // }
        // }
        // if (additiveUniformResults.data["inf"]) {
        //   const additiveDataInf = additiveUniformResults.data["inf"].additive;
        //   const repeatedAdditiveDataInf = additiveUniformResults.data["inf"]["repeated-additive"];
        //   const clippingAwareAdditiveDataInf = additiveUniformResults.data["2"]["clipping-aware-additive"];
        //   const clippingAwareRepeatedAdditiveDataInf = additiveUniformResults.data["2"]["clipping-aware-repeated-additive"];
        //   if (additiveDataInf) {
        //     datasets.push({
        //       label: "Additive",
        //       data: additiveDataInf.accuracy,
        //       fill: false,
        //       backgroundColor: "rgba(75,192,192,0.4)",
        //       borderColor: "rgba(75,192,192,1)",
        //     });
        //   }
        //   if (repeatedAdditiveDataInf) {
        //     datasets.push({
        //       label: "Repeated Additive",
        //       data: repeatedAdditiveDataInf.accuracy,
        //       fill: false,
        //       backgroundColor: "rgba(75,192,192,0.4)",
        //       borderColor: "rgba(75,192,192,1)",
        //     });
        //   }
        //   if (clippingAwareAdditiveDataInf) {
        //     datasets.push({
        //       label: "Clipping Aware Additive",
        //       data: clippingAwareAdditiveDataInf.accuracy,
        //       fill: false,
        //       backgroundColor: "rgba(75,192,192,0.4)",
        //       borderColor: "rgba(75,192,192,1)",
        //     });
        //   }
        //   if (clippingAwareRepeatedAdditiveDataInf) {
        //     datasets.push({
        //       label: "Clipping Aware Repeated Additive",
        //       data: clippingAwareRepeatedAdditiveDataInf.accuracy,
        //       fill: false,
        //       backgroundColor: "rgba(75,192,192,0.4)",
        //       borderColor: "rgba(75,192,192,1)",
        //     });
        //   }
        // }
        // if (OriginalResults) {
        //   datasets.push({
        //     label: "Accuracy of Original Model",
        //     data: originalAccuracyData,
        //     fill: false,
        //     backgroundColor: "rgba(0,192,75,0.4)",
        //     borderColor: "rgba(75,192,100,1)",
        //   });
        // }
        const data = {
          // labels: additiveUniformResults.data["2"]?.additive.epsilons ?? additiveUniformResults.data["inf"].additive.epsilons,
          // datasets: datasets,
          labels: additiveUniformResults.data["2"]["additive"].epsilons,
          datasets: [
            {
              label: "Additive-L2",
              data: additiveUniformResults.data["2"]["additive"].accuracy,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        };

        const options: ChartOptions<"line"> = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              backgroundColor: "#000000",
              callbacks: {
                label: (tooltipItem: TooltipItem<"line">) => {
                  const datasetLabel = tooltipItem.dataset.label;
                  const rawValue = tooltipItem.raw as { x: number; y: number };
                  const x = tooltipItem.parsed.x;
                  const y = tooltipItem.parsed.y;
                  return `${datasetLabel} - Epsilon: ${x.toFixed(2)} Accuracy: ${(y * 1).toFixed(2)}%`;
                },
              },
            },
            legend: {},
            title: {
              display: true,
              text: ["Epsilon vs Accuracy: Additive Uniform Attack", " ", "Order of the Norm:"],
            },
          },
          scales: {
            x: {
              type: "linear",
              // min: 0,
              //max: 0.1,
              title: {
                display: true,
                text: "Epsilon",
                font: {
                  size: 12,
                },
              },
            },
            y: {
              type: "linear",
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Accuracy (%)",
                font: {
                  size: 12,
                },
              },
            },
          },
        };

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(chartRef.current, {
          type: "line",
          data: data,
          options: options,
        });
      } else {
        console.log("No data available to render chart.");
      }
    }
  }, [attackResults]);

  return <canvas ref={chartRef} height={props.height} width={props.width} />;
}

function AdditiveGaussianChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const additiveGaussianResults = attackResults.find(
        (result) => result.attackname === "additive gaussian" && result.library === "foolbox"
      );
      const OriginalResults = attackResults.filter((result) => {
        return result.attackname === "original" && result.library === "original";
      });

      let originalAccuracyData = null;
      if (OriginalResults.length > 0) {
        const dataType = additiveGaussianResults.data["additive"]
          ? "additive"
          : additiveGaussianResults.data["clipping-aware-additive"]
          ? "clipping-aware-additive"
          : additiveGaussianResults.data["clipping-aware-repeated-additive"]
          ? "clipping-aware-repeated-additive"
          : "repeated-additive";

        const dataLength = additiveGaussianResults.data[dataType].accuracy.length;
        originalAccuracyData = Array.from({ length: dataLength }, () => OriginalResults[0].data.accuracy);
      }

      if (additiveGaussianResults) {
        const datasets: any[] = [];
        if (additiveGaussianResults.data["additive"]) {
          datasets.push({
            label: "Additive",
            data: additiveGaussianResults.data["additive"].accuracy,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
          });
        }
        if (additiveGaussianResults.data["clipping-aware-additive"]) {
          datasets.push({
            label: "Clipping-aware Additive",
            data: additiveGaussianResults.data["clipping-aware-additive"].accuracy,
            fill: false,
            backgroundColor: "rgba(192,75,75,0.4)",
            borderColor: "rgba(192,75,75,1)",
          });
        }
        if (additiveGaussianResults.data["clipping-aware-repeated-additive"]) {
          datasets.push({
            label: "Clipping-aware Repeated Additive",
            data: additiveGaussianResults.data["clipping-aware-repeated-additive"].accuracy,
            fill: false,
            backgroundColor: "rgba(192,192,75,0.4)",
            borderColor: "rgba(192,192,75,1)",
          });
        }
        if (additiveGaussianResults.data["repeated-additive"]) {
          datasets.push({
            label: "Repeated Additive",
            data: additiveGaussianResults.data["repeated-additive"].accuracy,
            fill: false,
            backgroundColor: "rgba(75,75,192,0.4)",
            borderColor: "rgba(75,75,192,1)",
          });
        }
        if (OriginalResults) {
          datasets.push({
            label: "Accuracy of Original Model",
            data: originalAccuracyData,
            fill: false,
            backgroundColor: "rgba(0,192,75,0.4)",
            borderColor: "rgba(75,192,100,1)",
          });
        }

        const data = {
          labels: additiveGaussianResults.data["additive"]?.epsilons,
          datasets: datasets,
        };

        const options: ChartOptions<"line"> = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              backgroundColor: "#000000",
              callbacks: {
                label: (tooltipItem: TooltipItem<"line">) => {
                  const datasetLabel = tooltipItem.dataset.label;
                  const rawValue = tooltipItem.raw as { x: number; y: number };
                  const x = tooltipItem.parsed.x;
                  const y = tooltipItem.parsed.y;
                  return `${datasetLabel} - Epsilon: ${x.toFixed(2)} Accuracy: ${(y * 1).toFixed(2)}%`;
                },
              },
            },
            legend: {},
            title: {
              display: true,
              text: ["Epsilon vs Accuracy: Additive Gaussian Attack", " "],
            },
          },
          scales: {
            x: {
              type: "linear",
              // min: 0,
              //max: 0.1,
              title: {
                display: true,
                text: "Epsilon",
                font: {
                  size: 12,
                },
              },
            },
            y: {
              type: "linear",
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Accuracy (%)",
                font: {
                  size: 12,
                },
              },
            },
          },
        };
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(chartRef.current, {
          type: "line",
          data: data,
          options: options,
        });
      } else {
        console.log("No data available to render chart.");
      }
    }
  }, [attackResults]);

  return <canvas ref={chartRef} height={props.height} width={props.width} />;
}

// export { FastGradientChart, ProjectedGradientDescentChart, BasicIterativeChart, MadrytEtAlChart, SPSAChart, MomentumIterativeChart };
// export {FoolboxChart};
export { DeepFoolChart, FoolboxFastGradientChart, FoolboxBasicIterativeChart, AdditiveUniformChart, AdditiveGaussianChart };
