import React from 'react';
import styled from 'styled-components';
import PieChart from './piechart'; // PieChart 컴포넌트를 가져옵니다
import DownloadIcon from '../assets/images/download.svg'; 
import PrintIcon from '../assets/images/printer.svg'; 

const ReportContainer = styled.div`
  background-color: #FAF8F8;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(12, 12, 13, 0.40);;
  padding: 20px;
  margin: 20px 0;
  margin-left: 20px;
  height: 400px;
  width: 90%;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const ReportTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 0px;
  margin-top: 0px;
  position: sticky; /* 타이틀을 고정 */
  top: 0; /* 타이틀이 컨테이너의 상단에 고정되도록 설정 */
  background-color: #FAF8F8; /* 배경색을 컨테이너와 동일하게 설정 */
  z-index: 1; /* 타이틀이 다른 요소들 위에 오도록 설정 */
  padding: 10px 0; /* 타이틀 텍스트에 패딩 추가 */
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left : 10px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ReportContent = styled.div`
  display: flex;
  flex-wrap: wrap; /* 차트들을 두 개씩 한 줄에 배치 */
  justify-content: space-between; /* 차트들 사이 공간 균등 배분 */
  overflow-y: auto; /* 차트에 세로 스크롤바 적용 */
  height: calc(90% - 30px); /* 전체 컨테이너에서 타이틀 높이를 제외한 높이 설정 */
`;

const ReportItem = styled.div`
  background-color: #FFFFFF;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  flex: 1 1 45%; /* 두 개의 차트가 가로로 배치되도록 설정 */
  min-width: 250px; /* 최소 너비 */
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex: 1 1 100%; /* 작은 화면에서는 차트가 한 줄에 하나씩 배치 */
  }
`;

const DataReport = () => {
  const chartsData = [
    {
      title: '데이터 품질 이상 항목',
      data: {
        labels: ['데이터 품질 이상 항목', '정상 항목'],
        datasets: [
          {
            label: '데이터 품질 이상 항목',
            data: [40, 60],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
    },
    {
      title: '데이터 품질 이상 환자',
      data: {
        labels: ['데이터 품질 이상 환자', '정상 환자'],
        datasets: [
          {
            label: '데이터 품질 이상 환자',
            data: [30, 70],
            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          },
        ],
      },
    },
    {
      title: '누락 항목',
      data: {
        labels: ['누락 항목', '정상 항목'],
        datasets: [
          {
            label: '누락 항목',
            data: [20, 80],
            backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1,
          },
        ],
      },
    },
    {
      title: '누락 환자',
      data: {
        labels: ['누락 환자', '정상 환자'],
        datasets: [
          {
            label: '누락 환자',
            data: [50, 50],
            backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
    },
    {
      title: '수정이 필요한 환자',
      data: {
        labels: ['수정이 필요한 환자', '정상 환자'],
        datasets: [
          {
            label: '수정이 필요한 환자',
            data: [60, 40],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1,
          },
        ],
      },
    },
    {
      title: '수정이 필요한 항목',
      data: {
        labels: ['수정이 필요한 항목', '정상 항목'],
        datasets: [
          {
            label: '수정이 필요한 항목',
            data: [10, 90],
            backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
          },
        ],
      },
    },
  ];

  return (
    <ReportContainer>
      <ReportHeader>
        <ReportTitle>데이터 분석 리포트</ReportTitle>
        <IconContainer>
          <Icon src={DownloadIcon} alt="Download" />
          <Icon src={PrintIcon} alt="Print" />
        </IconContainer>
      </ReportHeader>
      <ReportContent>
        {chartsData.map((chart, index) => (
          <ReportItem key={index}>
            <PieChart title={chart.title} data={chart.data} />
          </ReportItem>
        ))}
      </ReportContent>
    </ReportContainer>
  );
};

export default DataReport;
