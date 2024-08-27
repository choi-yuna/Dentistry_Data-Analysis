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
        position: 'right', // 범례를 차트의 오른쪽에 배치
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${value}명\n(${percentage}%)`;
        },
        color: '#000',
        font: {
          weight: 'bold',
        },
      },
    },
    maintainAspectRatio: false, // 차트 비율 조정 허용
  };

  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <ChartWrapper>
        <Pie data={data} options={options} />
      </ChartWrapper>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px; /* 고정된 높이 설정 */
  width: 400px;  /* 고정된 너비 설정 */
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #ffffff;
  margin: 20px auto; /* 수평 중앙 정렬 */
`;


const ChartWrapper = styled.div`
  position: relative;
  height: 90%; /* 차트 영역의 고정된 높이 */
  width: 90%; /* 차트 영역의 고정된 너비 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartTitle = styled.h3`
  margin-bottom: 20px;
  text-align: center;
`;

export default PieChart;
