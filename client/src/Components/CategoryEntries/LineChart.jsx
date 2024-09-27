import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'; // this is necessary even though it's not being used here bc it registers scales

const LineChart = ({organizedEntries}) => {
const xAxisArray = []
const weightDataArray = []

organizedEntries.map((elem)=>weightDataArray.push(elem.weight))
organizedEntries.map((elem)=>xAxisArray.push(elem.date))

let label = organizedEntries[0]?.reps
const data = {
  labels: xAxisArray,
  datasets: [
    {
      label: label + " rep",
      backgroundColor: "rgb(63, 26, 187)",
      borderColor: "rgb(63, 26, 187)",
      data: weightDataArray,
    },
  ],
};
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line data={data} />
    </div>
  );
};

export default LineChart;