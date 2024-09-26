import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const VisualPieChart = ({ chart }) => {
  // 디버깅용 로그
  console.log("차트 데이터:", chart);

  // chart 또는 chart.labels와 chart.data가 유효하지 않은 경우 처리
  if (!chart || !Array.isArray(chart.labels) || chart.labels.length === 0 || !Array.isArray(chart.data) || chart.data.length === 0) {
    return <div>유효하지 않은 차트 데이터입니다.</div>;
  }

  // 데이터 생성
  const labels = chart.labels;  
  const dataValues = chart.data; 
  const total = dataValues.reduce((acc, value) => acc + value, 0); 

  const data = {
    labels: labels,
    datasets: [
      {
        label: chart.title || "차트",
        data: dataValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#E7E9ED',
          '#8DD3C7',
          '#FDB462',
          '#B3DE69',
          '#FCCDE5',
          '#D9D9D9'
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const value = dataValues[tooltipItem.dataIndex];
            const percentage = ((value / total) * 100).toFixed(0); 
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          }
        }
      },
      datalabels: {
        color: 'black', 
        formatter: (value, ctx) => {
          const percentage = ((value / total) * 100).toFixed(0);
          return `${value} (${percentage}%)`; 
        },
        anchor: 'end',
        align: 'start', 
        offset: 30,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default VisualPieChart;
