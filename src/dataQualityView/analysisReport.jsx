import React, { useContext } from 'react';
import styled from 'styled-components';
import PieChart from './piechart'; 
import DownloadIcon from '../assets/images/download.svg'; 
import PrintIcon from '../assets/images/printer.svg'; 
import { DataContext } from '../context/DataContext';

const ReportContainer = styled.div`
  background-color: #FAF8F8;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(12, 12, 13, 0.40);
  padding: 20px;
  margin-left: ${(props) => (props.collapsed ? '9%' : '20%')};
  height: 370px;
  width: ${(props) => (props.collapsed ? '87%' : '75%')};
  transition: width 0.3s ease, height 0.3s ease;
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
  padding: 10px 0;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 10px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ReportContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  overflow-y: auto;
  height: calc(90% - 30px);
`;

const ReportItem = styled.div`
  background-color: #FFFFFF;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  flex: 1 1 45%; 
  min-width: 270px; 
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const DataReport = ({ collapsed }) => {
  const { analyzedData } = useContext(DataContext);

  // 데이터를 가져왔는지 확인
  if (!analyzedData || Object.keys(analyzedData).length === 0) {
    return <p>분석할 데이터가 없습니다.</p>; 
  }

  // 차트 데이터 생성
  const chartsData = [
    {
      title: '데이터 품질 이상 항목',
      data: {
        labels: ['데이터 품질 이상 항목', '정상 항목'],
        datasets: [
          {
            label: '데이터 품질 이상 항목',
            data: [
              Number(analyzedData.invalidItemCount) || 0,
              Number(analyzedData.totalItems) - Number(analyzedData.invalidItemCount) || 0,
            ],
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
            data: [
              Number(analyzedData.invalidCount) || 0, 
              Number(analyzedData.totalPatients) - Number(analyzedData.invalidCount) || 0,
            ],
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
            data: [
              Number(analyzedData.missingItemCount) || 0,
              Number(analyzedData.totalItems) - Number(analyzedData.missingItemCount) || 0,
            ],
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
            data: [
              Number(analyzedData.nullCount) || 0,
              Number(analyzedData.totalPatients) - Number(analyzedData.nullCount) || 0,
            ],
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
            data: [
              Number(analyzedData.invalidCount) || 0, 
              Number(analyzedData.totalPatients) - Number(analyzedData.invalidCount) || 0,
            ],
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
            data: [
              Number(analyzedData.invalidItemCount) || 0,
              Number(analyzedData.totalItems) - Number(analyzedData.invalidItemCount) || 0,
            ],
            backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
          },
        ],
      },
    },
  ];

  return (
    <ReportContainer collapsed={collapsed}>
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
