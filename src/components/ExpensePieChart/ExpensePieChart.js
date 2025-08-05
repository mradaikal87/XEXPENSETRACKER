import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styles from "../ExpensePieChart/ExpensePieChart.module.css";

// Register chart elements and plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function ExpensePieChart({ categoryTotals }) {
  const data = {
    labels: ["Food", "Entertainment", "Travel"],
    datasets: [
      {
        data: [
          categoryTotals.food || 0,
          categoryTotals.entertainment || 0,
          categoryTotals.travel || 0,
        ],
        backgroundColor: ["#8a2be2", "#ffa500", "#ffd700"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

 const options = {
  plugins: {
    legend: {
      display: false, // ❌ Hide default legend below the chart
    },
    datalabels: {
      color: "#fff",
      formatter: (value, context) => {
        const label = context.chart.data.labels[context.dataIndex];
        return `${label}: ₹${value}`;
      },
      font: {
        weight: "bold",
      },
    },
  },
};

  return (
    <div style={{ maxWidth: "199px", margin: "0 auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
}
