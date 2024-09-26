import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const VisualBarChart = ({ chart, headers }) => {
    // 차트 데이터 유효성 체크
    if (!chart || !Array.isArray(chart.labels) || chart.labels.length === 0 || !Array.isArray(chart.data) || chart.data.length === 0) {
      return <div>유효하지 않은 차트 데이터입니다.</div>;
    }
  
    // 데이터 생성
    const labels = chart.labels;
    const dataValues = chart.data;
    
    const data = {
      labels: labels,  // X축 데이터 (예: 나이, 체중, 키 등)
      datasets: [
        {
          label: chart.title || "차트",
          data: dataValues,  // Y축 데이터
          backgroundColor: '#36A2EB',  // 막대 색상
          borderColor: '#36A2EB',  // 막대 테두리 색상
          borderWidth: 1,  // 막대 테두리 두께
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
          beginAtZero: true,  // Y축을 0에서 시작
        },
      },
    };
  
    return (
      <div style={{ width: '100%', height: '400px' }}> {/* 차트 크기 조정 */}
        <Bar data={data} options={options} />
      </div>
    );
  };
  
export default VisualBarChart;
