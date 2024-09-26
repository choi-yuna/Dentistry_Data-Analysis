import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ title, data }) => {
  const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0); // 데이터 총합 계산

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 20,
          boxHeight: 10,
          padding: 10, 
          generateLabels: (chart) => {
            const data = chart.data;
            return data.labels.map((label, i) => {
              const value = data.datasets[0].data[i];
              const percentage = ((value / total) * 100).toFixed(2); // 퍼센트 계산
              return {
                text: `${label} (${percentage}%)`, // 퍼센트 추가
                fillStyle: data.datasets[0].backgroundColor[i], // 사각형 색상 유지
              };
            });
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          const percentage = ((value / total) * 100).toFixed(0); // 퍼센트 계산
          return `${value}\n(${percentage}%)`; // 값과 퍼센트 표시
        },
        color: '#000',
        font: {
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percent = ((value / total) * 100).toFixed(2); // 퍼센트 계산
            return `${tooltipItem.label}: ${value} (${percent}%)`; // 툴팁에 퍼센트 표시
          },
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
        '#FF6384', // 색상 설정
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#E7E9ED',
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
  font-weight: bold;
`;

export default PieChart;
