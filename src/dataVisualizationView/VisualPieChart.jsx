import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const VisualPieChart = ({ chart }) => {
  // 디버깅용 로그 추가
  console.log("차트 데이터:", chart);

  // chart 또는 chart.labels와 chart.data가 유효하지 않은 경우 처리
  if (!chart || !Array.isArray(chart.labels) || chart.labels.length === 0 || !Array.isArray(chart.data) || chart.data.length === 0) {
    return <div>유효하지 않은 차트 데이터입니다.</div>;
  }

  // 데이터 생성
  const labels = chart.labels;  // 'labels'에서 레이블 가져오기
  const dataValues = chart.data; // 'data'에서 데이터 값 가져오기

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
          '#E7E9ED'
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={data} />;
};


export default VisualPieChart;
