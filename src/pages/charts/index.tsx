import Head from "next/head";
import Image from "next/image";
import { Content, Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
// import "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  PointElement,
  LineElement,
  Legend,
} from "chart.js";
import { Chart, Filler } from "chart.js";
Chart.register(Filler);
import { Bar, Line } from "react-chartjs-2";
import { useState, useEffect, use } from "react";
import React from "react";
import { ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const inter = Inter({ subsets: ["latin"] });

const data = {
  labels: [
    "L2ContrastReductionAttack",
    "VirtualAdversarialAttack",
    "L2FastGradientAttack",
    "Original Model Accuracy",
  ],
  datasets: [
    {
      label: "Accuracy After FoolBox Attack",
      fillColor: "black",
      data: [0.54, 0.32, 0.29, 0.75],
      borderColor: "rgba, 0, 0,0)",
      backgroundColor: [
        "rgba(255, 0, 0, 0.8)",
        "rgba(255, 0, 0, 0.8)",
        "rgba(255, 0, 0, 0.8)",
        "rgba(35, 158, 45, 0.8)",
      ],
    },
    // {
    //   label: "Accuracy After FoolBox Attacks",
    //   fillColor: "red",
    //   data: [0.54, 0.47, 0.64, 0.34],
    //   borderColor: "rgb(53, 162, 235)",
    //   backgroundColor: "rgba(255, 0, 0, 0.8)",
    // },
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
    "Fast Gradient Method",
    "Basic Iterative Method",
    "Madry et al",
    "Momentum Iterative Method",
  ],
  datasets: [
    {
      label: "Original Model Accuracy",
      data: [0.75, 0.75, 0.75, 0.75],
      borderColor: "rgb(0, 255, 0)",
      backgroundColor: "rgba(35, 158, 45, 0.8)",
    },
    {
      label: "Accuracy After Cleverhans Attacks",
      fillColor: "red",
      data: [0.32, 0.55, 0.7, 0.29],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(255, 0, 0, 0.8)",
    },
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
  labels: [
    "Original Model",
    "Basic Iterative Method",
    "Madry et al",
    "Momentum Iterative Method",
  ],
  datasets: [
    {
      label: "Original Model Accuracy",
      data: [0.75],
      borderColor: "rgb(0, 255, 0)",
      backgroundColor: "rgba(35, 158, 45, 0.8)",
    },
    {
      label: "Accuracy After Cleverhans Attacks",
      fillColor: "red",
      data: [0, 0.55, 0.7, 0.29],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(255, 0, 0, 0.8)",
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
      label: "Original Moedddddel Accuracy",
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
      text: "ML Praivacy Meter Results",
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

export default function Home() {
  return (
    <>
      {/* <Content style={{backgroundColor="white" }}>  */}
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} style={{ backgroundColor: "fff" }}>
        <div className={styles.description}>Sample Charts</div>
        <div className={styles.Chart}>
          <Bar
            data={data}
            options={options}
            style={{
              position: "fixed",
              right: "1050px",
              top: "50px",
              // right: "%",
              //margin-right: "-45px",
              //align-items: "inherit",
              height: "400px",
              width: "400px",
              // max-width: var(--max-width)
            }}
          />
        </div>
        <div className={styles.Chart2}>
          <Bar data={data2} options={options2} />
        </div>
        <div className={styles.Chart3}>
          <Bar data={data3} options={options3} />
        </div>
        <div className={styles.Chart4}>
          <Line
            data={data4}
            options={options4}
            style={{
              position: "fixed",
              right: "1050px",
              top: "490px",
              // right: "%",
              //margin-right: "-45px",
              //align-items: "inherit",
              height: "300px",
              width: "300px",
              // max-width: var(--max-width)
            }}
          />
        </div>
        <div className={styles.grid}></div>
      </main>
      {/* </Content> */}
    </>
  );
}
