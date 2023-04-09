import { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Chart, Filler } from "chart.js";
import { attackPromiseState, attackResultState } from "@/recoil/Atom";
import { ChartData, ChartOptions, TooltipItem } from "chart.js/auto";

function FastGradientChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // const fastGradientResults = attackResults.filter((result) => result.attackname === "fast gradient");
      const fastGradientResults = attackResults.filter((result) => {
        return result.attackname === "fast gradient" && result.library === "cleverhans";
      });

      const OriginalResults = attackResults.filter((result) => {
        return result.attackname === "original" && result.library === "original";
      });

      if (fastGradientResults.length > 0) {
        const epsilons = fastGradientResults[0].data.epsilons;
        const accuracy = fastGradientResults[0].data.accuracy;
        const originalAccuracy = OriginalResults[0].data.accuracy;

        const data = {
          labels: epsilons,
          datasets: [
            {
              label: "Accuracy of Attacked Model",
              data: accuracy,
              fill: false,
              backgroundColor: "rgba(75,100,255,0.4)",
              borderColor: "rgba(75,100,255,1)",
            },
            {
              label: "Accuracy of Original Model",
              data: Array(epsilons.length).fill(originalAccuracy),
              fill: false,
              backgroundColor: "rgba(0,192,75,0.4)",
              borderColor: "rgba(75,192,100,1)",
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

                  // return label;
                },
              },
            },
            legend: {},
            title: {
              display: true,
              text: ["Epsilon vs Accuracy: Fast Gradient Attack", " "],
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

function ProjectedGradientDescentChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const pgdResults = attackResults.filter((result) => {
        return result.attackname === "projected gradient descent" && result.library === "cleverhans";
      });

      const OriginalResults = attackResults.filter((result) => {
        return result.attackname === "original" && result.library === "original";
      });

      if (pgdResults.length > 0) {
        const epsilons = pgdResults[0].data.epsilons;
        const accuracy = pgdResults[0].data.accuracy;
        const originalAccuracy = OriginalResults[0].data.accuracy;

        const data = {
          labels: epsilons,
          datasets: [
            {
              label: "Accuracy of Attacked Model",
              data: accuracy,
              fill: false,
              backgroundColor: "rgba(75,100,255,0.4)",
              borderColor: "rgba(75,100,255,1)",
            },
            {
              label: "Accuracy of Original Model",
              data: Array(epsilons.length).fill(originalAccuracy),
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,100,1)",
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
              text: ["Epsilon vs Accuracy: Projected Gradient Descent Attack", " "],
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

function BasicIterativeChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // const fastGradientResults = attackResults.filter((result) => result.attackname === "fast gradient");
      const basicIterativeResults = attackResults.filter((result) => {
        return result.attackname === "basic iterative" && result.library === "cleverhans";
      });

      const OriginalResults = attackResults.filter((result) => {
        return result.attackname === "original" && result.library === "original";
      });

      if (basicIterativeResults.length > 0) {
        const epsilons = basicIterativeResults[0].data.epsilons;
        const accuracy = basicIterativeResults[0].data.accuracy;
        const originalAccuracy = OriginalResults[0].data.accuracy;

        const data = {
          labels: epsilons,
          datasets: [
            {
              label: "Accuracy of Attacked Model",
              data: accuracy,
              fill: false,
              backgroundColor: "rgba(75,100,255,0.4)",
              borderColor: "rgba(75,100,255,1)",
            },
            {
              label: "Accuracy of Original Model",
              data: Array(epsilons.length).fill(originalAccuracy),
              fill: false,
              backgroundColor: "rgba(0,192,75,0.4)",
              borderColor: "rgba(75,192,75,1)",
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

                  // return label;
                },
              },
            },
            legend: {},
            title: {
              display: true,
              text: ["Epsilon vs Accuracy: Basic Iterative Attack", " "],
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

function MadrytEtAlChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // const fastGradientResults = attackResults.filter((result) => result.attackname === "fast gradient");
      const MadryResults = attackResults.filter((result) => {
        return result.attackname === "madry et al" && result.library === "cleverhans";
      });
      const OriginalResults = attackResults.filter((result) => {
        return result.attackname === "original" && result.library === "original";
      });

      if (MadryResults.length > 0) {
        const epsilons = MadryResults[0].data.epsilons;
        const accuracy = MadryResults[0].data.accuracy;
        const originalAccuracy = OriginalResults[0].data.accuracy;

        const data = {
          labels: epsilons,
          datasets: [
            {
              label: "Accuracy of Attacked Model",
              data: accuracy,
              fill: false,
              backgroundColor: "rgba(75,100,255,0.4)",
              borderColor: "rgba(75,100,255,1)",
            },
            {
              label: "Accuracy of Original Model",
              data: Array(epsilons.length).fill(originalAccuracy),
              fill: false,
              backgroundColor: "rgba(0,192,75,0.4)",
              borderColor: "rgba(75,192,75,1)",
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

                  // return label;
                },
              },
            },
            legend: {},
            title: {
              display: true,
              text: ["Epsilon vs Accuracy: Madry et Al Attack", " "],
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

function SPSAChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // const fastGradientResults = attackResults.filter((result) => result.attackname === "fast gradient");
      const SPSAResults = attackResults.filter((result) => {
        return result.attackname === "spsa" && result.library === "cleverhans";
      });
      const OriginalResults = attackResults.filter((result) => {
        return result.attackname === "original" && result.library === "original";
      });

      if (SPSAResults.length > 0) {
        const epsilons = SPSAResults[0].data.epsilons;
        const accuracy = SPSAResults[0].data.accuracy;
        const originalAccuracy = OriginalResults[0].data.accuracy;

        const data = {
          labels: epsilons,
          datasets: [
            {
              label: "Accuracy of Attacked Model",
              data: accuracy,
              fill: false,
              backgroundColor: "rgba(75,100,255,0.4)",
              borderColor: "rgba(75,100,255,1)",
            },
            {
              label: "Accuracy of Original Model",
              data: Array(epsilons.length).fill(originalAccuracy),
              fill: false,
              backgroundColor: "rgba(0,192,75,0.4)",
              borderColor: "rgba(75,192,75,1)",
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

                  // return label;
                },
              },
            },
            legend: {},
            title: {
              display: true,
              text: ["Epsilon vs Accuracy: SPSA Attack", " "],
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

function MomentumIterativeChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // const fastGradientResults = attackResults.filter((result) => result.attackname === "fast gradient");
      const MomentumIterativeResults = attackResults.filter((result) => {
        return result.attackname === "momentum iterative" && result.library === "cleverhans";
      });
      const OriginalResults = attackResults.filter((result) => {
        return result.attackname === "original" && result.library === "original";
      });

      if (MomentumIterativeResults.length > 0) {
        const epsilons = MomentumIterativeResults[0].data.epsilons;
        const accuracy = MomentumIterativeResults[0].data.accuracy;
        const originalAccuracy = OriginalResults[0].data.accuracy;

        const data = {
          labels: epsilons,
          datasets: [
            {
              label: "Accuracy of Attacked Model",
              data: accuracy,
              fill: false,
              backgroundColor: "rgba(75,100,255,0.4)",
              borderColor: "rgba(75,100,255,1)",
            },
            {
              label: "Accuracy of Original Model",
              data: Array(epsilons.length).fill(originalAccuracy),
              fill: false,
              backgroundColor: "rgba(0,192,75,0.4)",
              borderColor: "rgba(75,192,75,1)",
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

                  // return label;
                },
              },
            },
            legend: {},
            title: {
              display: true,
              text: ["Epsilon vs Accuracy: SPSA Attack", " "],
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

export { FastGradientChart, ProjectedGradientDescentChart, BasicIterativeChart, MadrytEtAlChart, SPSAChart, MomentumIterativeChart };
