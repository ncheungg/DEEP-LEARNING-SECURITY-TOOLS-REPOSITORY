import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
// import "chartjs-plugin-datalabels";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, PointElement, LineElement, Legend } from "chart.js";
import { Chart, Filler } from "chart.js";
Chart.register(Filler);
import { Bar, Line } from "react-chartjs-2";
import { useState, useEffect, use } from "react";
import React from "react";
import { ChartOptions } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const inter = Inter({ subsets: ["latin"] });
const data = {
  labels: [
    "L2 Fast Gradient Method Attack",
    "Inversion Attack",
    "Linf Deep Fool Attack",
    " Linf Contrast Reduction Attack",
    "L2 Additive Gaussian Noise Attack",
    "Original Model Accuracy",
  ],
  datasets: [
    {
      label: "Accuracy After FoolBox Attack",
      fillColor: "black",
      data: [0.39, 0.32, 0.09, 0.27, 0.29, 0.75],
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

export default function Chart_1() {
  return (
    <>
      <main className={styles.main}>
        {/* <div className={styles.description}>Sample Charts</div> */}
        <div className={styles.Chart} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Bar data={data} options={options} height="300px" width="300px" />
        </div>
        <div className={styles.Chart2} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Bar data={data2} options={options2} height="300px" width="300px" />
        </div>
        {/* <div className={styles.Chart3} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Bar data={data3} options={options3} height="300px" width="300px" />
        </div> */}
        <div className={styles.Chart4} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Line data={data4} options={options4} height="300px" width="300px" />
        </div>
        <div className={styles.grid}></div>
      </main>
    </>
  );
}
