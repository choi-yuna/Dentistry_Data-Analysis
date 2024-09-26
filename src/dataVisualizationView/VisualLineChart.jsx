import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const VisualLineChart = ({ chart }) => {
  // 차트 데이터 유효성 체크
  if (!chart || !Array.isArray(chart.labels) || chart.labels.length === 0 || !Array.isArray(chart.data) || chart.data.length === 0) {
    return <div>유효하지 않은 차트 데이터입니다.</div>;
  }

  // 데이터 생성
  const labels = chart.labels;
  const dataValues = chart.data;

  const data = {
    labels: labels,
    datasets: [
      {
        label: chart.title || "차트",
        data: dataValues,
        borderColor: '#FF6384',  // 선 색상 변경 (빨간색)
        backgroundColor: 'rgba(255, 99, 132, 0.2)',  // 배경색 변경 (투명한 빨간색)
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // 비율 고정 해제
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const value = dataValues[tooltipItem.dataIndex];
            return `${tooltipItem.label}: ${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}> {/* 차트 크기 조정 */}
      <Line data={data} options={options} />
    </div>
  );
};

export default VisualLineChart;
