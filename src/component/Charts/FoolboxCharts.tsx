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

        const data = {
          labels: deepFoolResults.data["2"]?.epsilons ?? deepFoolResults.data["inf"].epsilons,
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

function AdditiveUniformChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const additiveUniformResults = attackResults.find(
        (result) => result.attackname === "additive uniform" && result.library === "foolbox"
      );

      if (additiveUniformResults) {
        const datasets: any[] = [];
        if (additiveUniformResults.data["2"]) {
          const additiveData = additiveUniformResults.data["2"].additive;
          const clippingAwareAdditiveData = additiveUniformResults.data["2"]["clipping-aware-additive"];
          const clippingAwareRepeatedAdditiveData = additiveUniformResults.data["2"]["clipping-aware-repeated-additive"];
          const repeatedAdditiveData = additiveUniformResults.data["2"]["repeated-additive"];
          datasets.push(
            {
              label: "Additive-L2",
              data: additiveData.accuracy,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
            },
            {
              label: "Clipping Aware Additive-L2",
              data: clippingAwareAdditiveData.accuracy,
              fill: false,
              backgroundColor: "rgba(192,75,75,0.4)",
              borderColor: "rgba(192,75,75,1)",
            },
            {
              label: "Clipping Aware Repeated Additive-L2",
              data: clippingAwareRepeatedAdditiveData.accuracy,
              fill: false,
              backgroundColor: "rgba(75,192,75,0.4)",
              borderColor: "rgba(75,192,75,1)",
            },
            {
              label: "Repeated Additive-L2",
              data: repeatedAdditiveData.accuracy,
              fill: false,
              backgroundColor: "rgba(192,192,75,0.4)",
              borderColor: "rgba(192,192,75,1)",
            }
          );
        }
        if (additiveUniformResults.data["inf"]) {
          const additiveData = additiveUniformResults.data["inf"].additive;
          const repeatedAdditiveData = additiveUniformResults.data["inf"]["repeated-additive"];
          datasets.push(
            {
              label: "Additive-Linf",
              data: additiveData.accuracy,
              fill: false,
              backgroundColor: "rgba(75,75,192,0.4)",
              borderColor: "rgba(75,75,192,1)",
            },
            {
              label: "Repeated Additive-Linf",
              data: repeatedAdditiveData.accuracy,
              fill: false,
              backgroundColor: "rgba(192,75,192,0.4)",
              borderColor: "rgba(192,75,192,1)",
            }
          );
        }

        const data = {
          labels: additiveUniformResults.data["2"]?.additive.epsilons ?? additiveUniformResults.data["inf"].additive.epsilons,
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

// export { FastGradientChart, ProjectedGradientDescentChart, BasicIterativeChart, MadrytEtAlChart, SPSAChart, MomentumIterativeChart };
// export {FoolboxChart};
export { DeepFoolChart, FoolboxFastGradientChart, FoolboxBasicIterativeChart, AdditiveUniformChart, AdditiveGaussianChart };
