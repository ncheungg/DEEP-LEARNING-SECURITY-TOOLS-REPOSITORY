import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
// import "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  SubTitle,
  Tooltip,
  PointElement,
  LineElement,
  Legend,
} from "chart.js";
import { Chart, Filler } from "chart.js";
Chart.register(Filler);
import { Bar, Line, Scatter } from "react-chartjs-2";
import { useState, useEffect, use } from "react";
import React from "react";
// import { ChartOptions } from "chart.js";
// import { ChartData } from "chart.js/auto";
import { ChartData, ChartOptions, TooltipItem } from "chart.js/auto";
import { registerables } from "chart.js";
import "chartjs-adapter-date-fns";
Chart.register(...registerables);
import { useRecoilValue } from "recoil";
import { attackPromiseState, attackResultState } from "@/recoil/Atom";

// import { epsilonsFastGradientInfinity, accuracyFastGradientInfinity } from "@/component/Charts/Data";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const inter = Inter({ subsets: ["latin"] });
// const attackResults = useRecoilValue(attackResultState);

//   console.log({ attackResults });

const data = {
  labels: [
    "L2 Fast Gradient Method Attack",
    "Linf Deep Fool Attack",
    "Inversion Attack",
    " Linf Contrast Reduction Attack",
    "L2 Additive Gaussian Noise Attack",
    "Original Model Accuracy",
  ],
  datasets: [
    {
      label: "Accuracy After FoolBox Attack",
      fillColor: "black",
      data: [0.52, 0.24, 0.09, 0.27, 0.29, 0.75],
      borderColor: "rgb(0, 0, 0)",
      backgroundColor: [
        "rgba(255, 0, 0, 0.8)",
        "rgba(255, 0, 0, 0.8)",
        "rgba(255, 0, 0, 0.8)",
        "rgba(255, 0, 0, 0.8)",
        "rgba(255, 0, 0, 0.8)",
        "rgba(35, 158, 45, 0.8)",
      ],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,

      labels: {},
    },
    title: {
      display: true,
      text: "Foolbox Attack Strength",
    },
  },
  scales: {
    y: {
      min: 0,
      max: 1,
    },
  },
};

const data2 = {
  labels: [
    "Linf Fast Gradient Method Attack",
    "Linf Madry et al Attack",
    "Madry et al",
    "Linf Momentum Iterative Attack",
    "Original Model Accuracy",
  ],
  datasets: [
    {
      label: "Accuracy After Clenerhans Attack",
      data: [0.19, 0.26, 0.11, 0.32, 0.75],
      borderColor: "rgb(0, 0, 0)",
      backgroundColor: [
        "rgba(255, 0, 0, 0.8)",
        "rgba(255, 0, 0, 0.8)",
        "rgba(255, 0, 0, 0.8)",
        "rgba(255, 0, 0, 0.8)",
        "rgba(35, 158, 45, 0.8)",
      ],
    },
    // {
    //   label: "Accuracy After Cleverhans Attacks",
    //   fillColor: "red",
    //   data: [0.32, 0.55, 0.7, 0.29],
    //   borderColor: "rgba(53, 162, 235,0.1)",
    //   backgroundColor: "rgba(255, 0, 0, 0.8)",
    // },
  ],
};
const options2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {},
    title: {
      display: true,
      //position: "center",
      text: "Cleverhans Attack Strength",
    },
  },
  scales: {
    y: {
      min: 0,
      max: 1,
    },
  },
};

const data3 = {
  labels: ["Original Model", "Basic Iterative Method", "Madry et al", "Momentum Iterative Method"],
  datasets: [
    {
      label: "Original Model Accuracy",
      data: [0.75],
      borderColor: "rgb(0, 255, 0)",
      backgroundColor: "rgba(35, 158, 45, 0.8)",
      fill: true,
    },
    {
      label: "Accuracy After Cleverhans Attacks",
      fillColor: "red",
      data: [0, 0.55, 0.7, 0.29],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(255, 0, 0, 0.8)",
      fill: true,
    },
  ],
};

const options3 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {},
    title: {
      display: true,
      //position: "center",
      text: "Cleverhans Attack Strength",
    },
  },
  scales: {
    y: {
      min: 0,
      max: 1,
    },
  },
};

const data4 = {
  labels: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
  datasets: [
    {
      label: "Original Model Accuracy",
      data: [0, 0.23, 0.44, 0.65, 0.83, 1.0],
      borderColor: "rgba(0,0,220)",
      backgroundColor: "rgba(0,0,120,0.1)",
      pointRadius: 0,
      lineTension: 0.8,
      fill: true,
    },
    {
      label: "y=x",
      data: [0, 0.2, 0.4, 0.6, 0.8, 1],
      borderColor: "orange",
      pointRadius: 0,
      borderWidth: 2,
      borderDash: [5, 5], // this sets the border to a dotted line
      fill: false,
    },
  ],
};

const options4 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {},
    title: {
      display: true,
      //position: "center",
      text: "ML Privacy Meter Results",
    },
  },
  scales: {
    y: {
      scaleLabel: {
        display: true,
        labelString: "Your X-axis Title",
      },
      min: 0,
      max: 1,
      beginAtZero: true,
    },
    x: {
      label: "He",
      min: 0,
      max: 1,
    },
  },
  elements: {
    line: {
      fill: true,
    },
  },
};

const data5 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: true,
      lineTension: 0.4,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const options5 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {},
    title: {
      display: true,
      //position: "center",
      text: "ML Privacy Meter Results",
    },
  },
  scales: {
    y: {
      scaleLabel: {
        display: true,
        labelString: "Your X-axis Title",
      },

      beginAtZero: true,
    },
    x: {
      label: "He",
    },
  },
};

const epsilonFastGradientTwo = [0.0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2];

const accuracyFastGradientTwo = [64.0, 64.0, 64.0, 64.0, 62.0, 62.0, 62.0, 62.0, 62.0, 62.0, 60.000003814697266];

const epsilonsFastGradientInfinity = [0.0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2];

const accuracyFastGradientInfinity = [
  64.0, 30.000001907348633, 10.000001907348633, 7.999998092651367, 4.000001907348633, 0.0, 4.000001907348633, 1.9999980926513672,
  4.000001907348633, 0.0, 1.9999980926513672,
];

const data7 = {
  datasets: [
    {
      label: "Two",

      data: epsilonFastGradientTwo.map((epsilon, index) => {
        return { x: epsilon, y: accuracyFastGradientTwo[index] };
      }),

      backgroundColor: "rgba(255, 0, 0, 0.2)",
      borderColor: "rgba(255, 0, 0, 1)",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
    },

    {
      label: "Infinity",

      data: epsilonsFastGradientInfinity.map((epsilon, index) => {
        return { x: epsilon, y: accuracyFastGradientInfinity[index] };
      }),
      // data: { x: 1, y: 0 },
      borderColor: "Green",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
      fill: false,
    },
  ],
};
for (let i = 0; i < data7.datasets.length; i++) {
  data7.datasets[i].data = data7.datasets[i].data.map((point) => {
    return { x: point.x, y: point.y / 100 };
  });
}

// data.datasets.forEach((dataset) => {
//   dataset.data.forEach((point) => {
//     point.y = point.y / 100;
//   });
// });

const options9: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      backgroundColor: "#000000",
      callbacks: {
        label: (tooltipItem: TooltipItem<"line">) => {
          const datasetLabel = tooltipItem.dataset.label;
          const rawValue = tooltipItem.raw as { x: number; y: number };
          const label = `${datasetLabel} - Epsilon: ${rawValue.x.toFixed(2)}\nAccuracy: ${(rawValue.y * 100).toFixed(2)}%`;
          return label;
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
    },
    y: {
      type: "linear",
    },
  },
};

const FoolboxAccuracyDeepFoolAttackTwo = [64.0, 24.0, 1.9999980926513672, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
const FoolboxEpsilonDeepFoolAttackTwo = [0.0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2];
const FoolboxAccuracyDeepFoolAttackInfinity = [64.0, 24.0, 1.9999980926513672, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
const FoolboxEpsilonDeepFoolAttackInfinity = [0.0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2];

const data8 = {
  datasets: [
    {
      label: "Two",

      data: FoolboxEpsilonDeepFoolAttackTwo.map((epsilon, index) => {
        return { x: epsilon, y: FoolboxAccuracyDeepFoolAttackTwo[index] };
      }),

      backgroundColor: "rgba(255, 0, 0, 0.2)",
      borderColor: "rgba(255, 0, 0, 1)",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
    },

    {
      label: "Infinity",

      data: FoolboxEpsilonDeepFoolAttackInfinity.map((epsilon, index) => {
        return { x: epsilon, y: FoolboxAccuracyDeepFoolAttackInfinity[index] };
      }),
      // data: { x: 1, y: 0 },
      borderColor: "Green",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
      fill: false,
    },
  ],
};
for (let i = 0; i < data8.datasets.length; i++) {
  data8.datasets[i].data = data8.datasets[i].data.map((point) => {
    return { x: point.x, y: point.y / 100 };
  });
}

// const options8: ChartOptions = {
//   ...options9,
//   plugins: {
//     ...options9.plugins,
//     title: {
//       display: true,
//       text: ["Epsilon vs Accuracy: Deep Fool Attack", " ", "Order of the Norm:"],
//     },
//   },
// };
const options8: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      backgroundColor: "#000000",
      callbacks: {
        label: (tooltipItem: TooltipItem<"line">) => {
          const datasetLabel = tooltipItem.dataset.label;
          const rawValue = tooltipItem.raw as { x: number; y: number };
          const label = `${datasetLabel} - Epsilon: ${rawValue.x.toFixed(2)}\nAccuracy: ${(rawValue.y * 100).toFixed(2)}%`;
          return label;
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
    },
    y: {
      type: "linear",
    },
  },
};
const BasicIterativeAccuracyTwo = [
  64.0, 64.0, 64.0, 62.0, 62.0, 62.0, 62.0, 60.000003814697266, 60.000003814697266, 60.000003814697266, 56.0,
];
const BasicIterativeEpsilonTwo = [0.0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2];

const BasicIterativeAccuracyInfinity = [64.0, 16.000001907348633, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
const BasicIterativeEpsilonInfinity = [0.0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2];

const data9 = {
  datasets: [
    {
      label: "Two",

      data: BasicIterativeEpsilonTwo.map((epsilon, index) => {
        return { x: epsilon, y: BasicIterativeAccuracyTwo[index] };
      }),

      backgroundColor: "rgba(255, 0, 0, 0.2)",
      borderColor: "rgba(255, 0, 0, 1)",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
    },

    {
      label: "Infinity",

      data: BasicIterativeEpsilonInfinity.map((epsilon, index) => {
        return { x: epsilon, y: BasicIterativeAccuracyInfinity[index] };
      }),
      // data: { x: 1, y: 0 },
      borderColor: "Green",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
      fill: false,
    },
  ],
};
for (let i = 0; i < data9.datasets.length; i++) {
  data9.datasets[i].data = data9.datasets[i].data.map((point) => {
    return { x: point.x, y: point.y / 100 };
  });
}

// const options11: ChartOptions = {
//   ...options9,
//   plugins: {
//     ...options9.plugins,
//     title: {
//       display: true,
//       text: ["Epsilon vs Accuracy: Baisc Iterative Attack", " ", "Order of the Norm:"],
//     },
//   },
// };

const options11: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      backgroundColor: "#000000",
      callbacks: {
        label: (tooltipItem: TooltipItem<"line">) => {
          const datasetLabel = tooltipItem.dataset.label;
          const rawValue = tooltipItem.raw as { x: number; y: number };
          const label = `${datasetLabel} - Epsilon: ${rawValue.x.toFixed(2)}\nAccuracy: ${(rawValue.y * 100).toFixed(2)}%`;
          return label;
        },
      },
    },
    legend: {},
    title: {
      display: true,
      text: ["Epsilon vs Accuracy: Baisc Iterative Attack", " ", "Order of the Norm:"],
    },
  },
  scales: {
    x: {
      type: "linear",
    },
    y: {
      type: "linear",
    },
  },
};

const AdditiveGaussianNoiseAttackAdditiveAccuracy = [64.0, 64.0, 64.0, 64.0];
const AdditiveGaussianNoiseAttackAdditiveEpsilons = [0.0, 0.02, 0.04, 0.06];

const AdditiveGaussianNoiseAttackClippingAccuracy = [64.0, 64.0, 64.0, 64.0];
const AdditiveGaussianNoiseAttackClippingEpsilons = [0.0, 0.02, 0.04, 0.06];

const AdditiveGaussianNoiseAttackRepeatedAccuracy = [64.0, 64.0, 64.0, 64.0];
const AdditiveGaussianNoiseAttackRepeatedEpsilons = [0.0, 0.02, 0.04, 0.06];

const AdditiveGaussianNoiseAttackClippingRepeatedAccuracy = [30.000001907348633, 64.0, 64.0, 64.0];
const AdditiveGaussianNoiseAttackClippingRepeatedEpsilons = [0.0, 0.02, 0.04, 0.06];

const additiveGaussianData = {
  datasets: [
    {
      label: "Line 1\nLine 2",

      data: AdditiveGaussianNoiseAttackAdditiveEpsilons.map((epsilon, index) => {
        return { x: epsilon, y: AdditiveGaussianNoiseAttackAdditiveAccuracy[index] };
      }),

      backgroundColor: "rgba(255, 0, 0, 0.2)",
      borderColor: "rgba(255, 0, 0, 1)",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
    },

    {
      label: "Clipping",

      data: AdditiveGaussianNoiseAttackClippingEpsilons.map((epsilon, index) => {
        return { x: epsilon, y: AdditiveGaussianNoiseAttackClippingAccuracy[index] };
      }),
      // data: { x: 1, y: 0 },
      borderColor: "Green",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
      fill: false,
    },
    {
      label: "Repeated",

      data: AdditiveGaussianNoiseAttackRepeatedEpsilons.map((epsilon, index) => {
        return { x: epsilon, y: AdditiveGaussianNoiseAttackRepeatedAccuracy[index] };
      }),
      // data: { x: 1, y: 0 },
      borderColor: "Blue",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
      fill: false,
    },

    {
      label: "Clipping & Repeated",

      data: AdditiveGaussianNoiseAttackClippingRepeatedEpsilons.map((epsilon, index) => {
        return { x: epsilon, y: AdditiveGaussianNoiseAttackClippingRepeatedAccuracy[index] };
      }),
      // data: { x: 1, y: 0 },
      borderColor: "Purple",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
      fill: false,
    },
  ],
};
for (let i = 0; i < additiveGaussianData.datasets.length; i++) {
  additiveGaussianData.datasets[i].data = additiveGaussianData.datasets[i].data.map((point) => {
    return { x: point.x, y: point.y / 100 };
  });
}

// const additiveGaussianOptions: ChartOptions = {
//   ...options9,
//   plugins: {
//     ...options9.plugins,
//     title: {
//       display: true,
//       text: ["Epsilon vs Accuracy: Additive Gaussian Attack", "Order of the Norm: 2 ", "", "Attack Type:"],
//     },
//   },
// };
const additiveGaussianOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      backgroundColor: "#000000",
      callbacks: {
        label: (tooltipItem: TooltipItem<"line">) => {
          const datasetLabel = tooltipItem.dataset.label;
          const rawValue = tooltipItem.raw as { x: number; y: number };
          const label = `${datasetLabel} - Epsilon: ${rawValue.x.toFixed(2)}\nAccuracy: ${(rawValue.y * 100).toFixed(2)}%`;
          return label;
        },
      },
    },
    legend: {},
    title: {
      display: true,
      text: ["Epsilon vs Accuracy: Additive Gaussian Attack", "Order of the Norm: 2 ", "", "Attack Type:"],
    },
  },
  scales: {
    x: {
      type: "linear",
    },
    y: {
      type: "linear",
    },
  },
};

const AdditiveUniformNoiseAttackAdditiveAccuracyTwo = [64.0, 64.0, 64.0, 64.0];
const AdditiveUniformNoiseAttackAdditiveEpsilonTwo = [0.0, 0.02, 0.04, 0.06];

const AdditiveUniformNoiseAttackClippingAccuracyTwo = [64.0, 64.0, 64.0, 64.0];
const AdditiveUniformNoiseAttackClippingEpsilonsTwo = [0.0, 0.02, 0.04, 0.06];

const AdditiveUniformNoiseAttackRepeatedAccuracyTwo = [64.0, 64.0, 64.0, 64.0];
const AdditiveUniformNoiseAttackRepeatedEpsilonsTwo = [0.0, 0.02, 0.04, 0.06];

const AdditiveUniformNoiseAttackClippingRepeatedAccuracyTwo = [50.0, 64.0, 64.0, 64.0];
const AdditiveUniformNoiseAttackClippingRepeatedEpsilonsTwo = [0.0, 0.02, 0.04, 0.06];

const AdditiveUniformNoiseAttackAdditiveAccuracyInfinity = [64.0, 64.0, 64.0, 64.0];
const AdditiveUniformNoiseAttackAdditiveEpsilonInfinity = [0.0, 0.02, 0.04, 0.06];

const AdditiveUniformNoiseAttackRepeatedAccuracyInfinity = [64.0, 64.0, 64.0, 64.0];
const AdditiveUniformNoiseAttackRepeatedEpsilonsInfinity = [0.0, 0.02, 0.04, 0.06];

const AdditiveUniformData = {
  datasets: [
    {
      label: "Additive",

      data: AdditiveUniformNoiseAttackAdditiveEpsilonTwo.map((epsilon, index) => {
        return { x: epsilon, y: AdditiveUniformNoiseAttackAdditiveAccuracyTwo[index] };
      }),

      backgroundColor: "rgba(255, 0, 0, 0.2)",
      borderColor: "rgba(255, 0, 0, 1)",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
    },

    {
      label: "Clipping",

      data: AdditiveUniformNoiseAttackClippingEpsilonsTwo.map((epsilon, index) => {
        return { x: epsilon, y: AdditiveUniformNoiseAttackClippingAccuracyTwo[index] };
      }),
      // data: { x: 1, y: 0 },
      borderColor: "Green",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
      fill: false,
    },
    {
      label: "Repeated",

      data: AdditiveUniformNoiseAttackRepeatedEpsilonsTwo.map((epsilon, index) => {
        return { x: epsilon, y: AdditiveUniformNoiseAttackRepeatedAccuracyTwo[index] };
      }),
      // data: { x: 1, y: 0 },
      borderColor: "Blue",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
      fill: false,
    },

    {
      label: "Clipping & Repeated",

      data: AdditiveUniformNoiseAttackClippingRepeatedEpsilonsTwo.map((epsilon, index) => {
        return { x: epsilon, y: AdditiveUniformNoiseAttackClippingRepeatedAccuracyTwo[index] };
      }),
      // data: { x: 1, y: 0 },
      borderColor: "Purple",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
      fill: false,
    },
    {
      label: "Additive(INFINITY)",

      data: AdditiveUniformNoiseAttackAdditiveEpsilonInfinity.map((epsilon, index) => {
        return { x: epsilon, y: AdditiveUniformNoiseAttackAdditiveAccuracyInfinity[index] };
      }),
      // data: { x: 1, y: 0 },
      borderColor: "Brown",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
      fill: false,
    },

    {
      label: "Repeated(INFINITY)",

      data: AdditiveUniformNoiseAttackRepeatedEpsilonsInfinity.map((epsilon, index) => {
        return { x: epsilon, y: AdditiveUniformNoiseAttackRepeatedAccuracyInfinity[index] };
      }),
      // data: { x: 1, y: 0 },
      borderColor: "Pink",
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 7,
      fill: false,
    },
  ],
};
for (let i = 0; i < additiveGaussianData.datasets.length; i++) {
  additiveGaussianData.datasets[i].data = additiveGaussianData.datasets[i].data.map((point) => {
    return { x: point.x, y: point.y / 100 };
  });
}

const additiveUniformOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      backgroundColor: "#000000",
      callbacks: {
        label: (tooltipItem: TooltipItem<"line">) => {
          const datasetLabel = tooltipItem.dataset.label;
          const rawValue = tooltipItem.raw as { x: number; y: number };
          const label = `${datasetLabel} - Epsilon: ${rawValue.x.toFixed(2)}\nAccuracy: ${(rawValue.y * 100).toFixed(2)}%`;
          return label;
        },
      },
    },
    legend: {},
    title: {
      display: true,
      text: ["Epsilon vs Accuracy: Additive Uniform Noise Attack", " ", "Order of the Norm:"],
    },
  },
  scales: {
    x: {
      type: "linear",
    },
    y: {
      type: "linear",
    },
  },
};
export {
  inter,
  data,
  options,
  data2,
  options2,
  data4,
  options4,
  data8,
  options8,
  options9,
  data7,
  data9,
  options11,
  additiveGaussianData,
  additiveGaussianOptions,
  AdditiveUniformData,
  additiveUniformOptions,
};

export default function Chart_1() {
  return (
    <>
      <main className={styles.main}>
        {/* <div className={styles.description}>Sample Charts</div> */}
        <div className={styles.FoolboxSummaryChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Bar data={data} options={options} height="300px" width="300px" />
        </div>
        <div className={styles.lineBreak}>Text between the charts</div>
        <div className={styles.FoolboxFastGradientAccuracyChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Line data={data7} options={options9} height="300px" width="300px" />
        </div>
        <div className={styles.FoolboxDeepFoolAccuracyChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Line data={data8} options={options8} height="300px" width="300px" />
        </div>
        <div className={styles.FoolboxBasicIterativeAttackAccuracyChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Line data={data9} options={options11} height="300px" width="300px" />
        </div>
        <div className={styles.FoolboxAdditiveGaussianAttackAccuracyChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Line data={additiveGaussianData} options={additiveGaussianOptions} height="300px" width="300px" />
        </div>
        <div className={styles.FoolboxAdditiveUniformAttackAccuracyChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Line data={AdditiveUniformData} options={additiveUniformOptions} height="300px" width="300px" />
        </div>
        <div className={styles.CleverHansSummaryChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Bar data={data2} options={options2} height="300px" width="300px" />
        </div>
        {/* <div className={styles.Chart3} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Bar data={data3} options={options3} height="300px" width="300px" />
        </div> */}
        <div className={styles.MLSummaryChart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Line data={data4} options={options4} height="300px" width="250px" />
        </div>

        <div className={styles.grid}></div>
      </main>
    </>
  );
}
