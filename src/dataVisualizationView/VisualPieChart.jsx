// VisualPieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

//데이터 유효 검사
const VisualPieChart = ({ chartData }) => {
  if (!chartData || !chartData.rows) {
    return <div>유효하지 않은 데이터입니다.</div>;
  }

  const labels = chartData.rows.map(row => row[0]);
  const dataValues = chartData.rows.map(row => parseInt(row[1], 10));

 
  const data = {
    labels: labels,
    datasets: [
      {
        label: chartData.subTitle,
        data: dataValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#E7E9ED'
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={data} />;
};

export default VisualPieChart;
