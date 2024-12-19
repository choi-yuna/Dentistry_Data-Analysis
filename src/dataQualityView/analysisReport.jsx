import React, { useContext } from 'react';
import styled from 'styled-components';
import PieChart from './piechart';  
import { DataContext } from '../context/DataContext';

const ReportContainer = styled.div`
  background-color: #FAF8F8;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(12, 12, 13, 0.40);
  padding: 20px;
  margin-left: ${(props) => (props.collapsed ? '9%' : '20%')};
  height: 80vh; /* 최대 높이 설정 */
  width: ${(props) => (props.collapsed ? '87%' : '75%')};
  transition: width 0.3s ease, height 0.3s ease;
  overflow-y: auto; /* 스크롤을 위해 추가 */
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const ReportTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 1%;
  margin-top: 0px;
  padding: 10px 0;
`;


const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
`;

const ReportGroup = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #FFFFFF;
  margin-bottom: 10px;
`;

const GroupTitle = styled.h3`
  font-size: 19px;
  margin-bottom: 10px;
  text-align: start;
  margin-left: 4%;
  
`;

const ReportItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ReportItem = styled.div`
  background-color: #FFFFFF;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  flex: 1 1 45%; 
  min-width: 270px; 
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

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
  // 차트 데이터 그룹별로 생성
  const chartGroups = [
    {
      title: '품질율',
      charts: [
        {
          title: '환자 수',
          data: {
            labels: [ 'pass','fail'],
            datasets: [
              {
                label: '데이터 품질 이상 환자',
                data: [
                  Number(analyzedData.totalPatients) - Number(analyzedData.requiredCount) || 0,
                  Number(analyzedData.requiredCount) || 0, 
                ],
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
              },
            ],
          },
        },
        {
          title: '항목 수',
          data: {
            labels: ['pass', 'fail'],
            datasets: [
              {
                label: '데이터 품질 이상 항목',
                data: [
                  Number(analyzedData.totalItems) - Number(analyzedData.invalidItemCount) || 0,
                  Number(analyzedData.invalidItemCount) || 0,
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
              },
            ],
          },
        },
      ],
    },
    {
      title: '완전성',
      charts: [
        {
          title: '환자 수',
          data: {
            labels: ['pass', 'fail'],
            datasets: [
              {
                label: '누락 환자',
                data: [
                  Number(analyzedData.totalPatients) - Number(analyzedData.nullCount) || 0,
                  Number(analyzedData.nullCount) || 0,
                ],
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          },
        },
        {
          title: '항목 수',
          data: {
            labels: ['pass', 'fail'],
            datasets: [
              {
                label: '누락 항목',
                data: [
                  Number(analyzedData.totalItems) - Number(analyzedData.missingItemCount) || 0,
                  Number(analyzedData.missingItemCount) || 0,
                ],
                backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1,
              },
            ],
          },
        },
      ],
    },
    {
      title: '유효성',
      charts: [
        {
          title: '환자 수',
          data: {
            labels: ['pass', 'fail'],
            datasets: [
              {
                label: '수정이 필요한 환자',
                data: [
                  Number(analyzedData.totalPatients) - Number(analyzedData.invalidCount) || 0,
                  Number(analyzedData.invalidCount) || 0, 
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1,
              },
            ],
          },
        },
        {
          title: '항목 수',
          data: {
            labels: ['pass', 'fail'],
            datasets: [
              {
                label: '수정이 필요한 항목',
                data: [
                  Number(analyzedData.totalItems) - Number(analyzedData.invalidItemCount) || 0,
                  Number(analyzedData.invalidItemCount) || 0,
                ],
                backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
              },
            ],
          },
        },
      ],
    },
  ];

  return (
    <ReportContainer collapsed={collapsed}>
      <ReportHeader>
        <ReportTitle>데이터 분석 리포트</ReportTitle>
      </ReportHeader>
      <ReportContent>
        {chartGroups.map((group, index) => (
          <ReportGroup key={index}>
            <GroupTitle>{group.title}</GroupTitle>
            <ReportItems>
              {group.charts.map((chart, chartIndex) => (
                <ReportItem key={chartIndex}>
                  <PieChart title={chart.title} data={chart.data} />
                </ReportItem>
              ))}
            </ReportItems>
          </ReportGroup>
        ))}
      </ReportContent>
    </ReportContainer>
  );
};

export default DataReport;
