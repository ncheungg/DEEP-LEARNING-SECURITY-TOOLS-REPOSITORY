import { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Chart, Filler, LinearScale, registerables } from "chart.js";
import { attackPromiseState, attackResultState } from "@/recoil/Atom";
import { ChartData, ChartOptions, TooltipItem } from "chart.js/auto";
Chart.register(...registerables);

function PrivacyMeterChart(props: { height: string; width: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const attackResults = useRecoilValue(attackResultState);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // const fastGradientResults = attackResults.filter((result) => result.attackname === "fast gradient");
      const privacyMeterResults = attackResults.filter((result) => {
        return result.attackname === "population" && result.library === "privacy meter";
      });

      if (privacyMeterResults.length > 0) {
        const falsePositiveRate = privacyMeterResults[0].data.false_positive_rate;
        const accuracy = privacyMeterResults[0].data.accuracy;
        const truePositiveRate: number[] = privacyMeterResults[0].data.true_positives.map((tp: number, i: number) => {
          const fn: number = privacyMeterResults[0].data.false_negatives[i];
          return tp / (tp + fn);
        });

        const data = {
          labels: falsePositiveRate,
          datasets: [
            {
              label: "y=x",
              data: falsePositiveRate,
              fill: false,
              borderColor: "red",
              pointRadius: 0,
              borderWidth: 2,
              borderDash: [5, 5], // this sets the border to a dotted line
            },
            {
              label: "ROC Curve",
              data: truePositiveRate,
              fill: true,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              pointRadius: 0,
              lineTension: 0.8,
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
                  return `${datasetLabel} - True Positive Rate: ${x.toFixed(3)} False Positive Rate: ${(y * 1).toFixed(2)}%`;

                  // return label;
                },
              },
            },
            legend: {},
            title: {
              display: true,
              text: ["ROC Curve of Population Attack", " "],
            },
          },
          scales: {
            x: {
              type: "linear",
              min: 0,
              max: 1,
              title: {
                display: true,
                text: "False Positive Rate",
                font: {
                  size: 12,
                },
              },
            },
            y: {
              type: "linear",
              min: 0,
              max: 1,
              title: {
                display: true,
                text: "True Positive Rate",
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
export { PrivacyMeterChart };
