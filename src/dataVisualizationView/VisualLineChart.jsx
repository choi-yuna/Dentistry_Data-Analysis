import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // 플러그인 추가

// Chart.js와 플러그인 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ChartDataLabels);

const VisualLineChart = ({ chart }) => {
  if (!chart || !Array.isArray(chart.labels) || chart.labels.length === 0 || !Array.isArray(chart.data) || chart.data.length === 0) {
    return <div>유효하지 않은 차트 데이터입니다.</div>;
  }

  const labels = chart.labels;
  const dataValues = chart.data;

  // 전체 합 계산
  const total = dataValues.reduce((acc, curr) => acc + curr, 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: chart.title || "차트",
        data: dataValues,
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
          },
        },
      },
      datalabels: {
        display: true,  // 데이터 라벨을 표시
        color: '#000',  // 레이블 색상
        anchor: 'end',  // 레이블을 끝 부분에 배치
        align: 'top',   // 레이블을 위쪽으로 배치
        offset: -5,     // 포인트에서 레이블까지의 거리
        rotation: 0,    // 레이블 회전 각도
        font: {
          size: 10,     // 레이블 폰트 크기
        },
        formatter: function(value) {
          const percentage = ((value / total) * 100).toFixed(1);  // 퍼센트 계산
          return `${value} (${percentage}%)`;  // 값과 퍼센트 함께 표시
        },
      },
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
    <div style={{ width: '100%', height: '90%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default VisualLineChart;
