import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ title, data }) => {
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 5,
          padding: 5,
        },
      },
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(0);
          return `${value}\n(${percentage}%)`;
        },
        color: '#000',
        font: {
          weight: 'bold',
        },
      },
    },
    maintainAspectRatio: false, 
  };


  const modifiedData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#E7E9ED'
      ],
    })),
  };

  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <ChartWrapper>
        <Pie data={modifiedData} options={options} />
      </ChartWrapper>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px; 
  width: 400px;  
  padding: 10px;
  background-color: #ffffff;
  margin: auto; 
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 100%; 
  width: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartTitle = styled.h3`
  margin-bottom: 20px;
  text-align: center;
  text-weight: bold;
`;

export default PieChart;
