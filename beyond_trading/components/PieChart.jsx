import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({
  labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  FMV = [2, 19, 3, 5, 2],
}) {
  let chartData = {
    labels,
    datasets: [
      {
        label: 'perentage',
        data: FMV,
        backgroundColor: [
          '#003f5c',
          '#58508d',
          '#bc5090',
          '#ff6361',
          '#ffa600',
          '#dd5182',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 0.5,
      },
    ],
  };
  return (
    <div className="PieChart">
      <Pie
        data={chartData}
        options={{
          responsive: true,
        }}
      />
    </div>
  );
}
