import React from 'react';
import styled from 'styled-components';

const ReportContainer = styled.div`
  background-color: #F4F4F4; /* 배경색 */
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 */
  padding: 20px; /* 내부 여백 */
  margin: 20px 0; /* 상하 여백 */
`;

const ReportTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
`;

const ReportContent = styled.div`
  display: flex;
  justify-content: space-between; /* 내부 요소 간격 조정 */
  flex-wrap: wrap; /* 작은 화면에서는 요소가 줄바꿈되도록 설정 */
`;

const ReportItem = styled.div`
  background-color: #FFFFFF; /* 아이템 배경색 */
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  flex: 1 1 45%; /* 반응형 레이아웃: 화면의 45%를 차지 */
  min-width: 250px; /* 최소 너비 */
`;

const DataReport = () => {
  return (
    <ReportContainer>
      <ReportTitle>데이터 분석 리포트</ReportTitle>
      <ReportContent>
        <ReportItem>
          <h3>전체 항목: 데이터 품질 이상 항목</h3>
          {/* 데이터 품질 이상 항목에 대한 내용 또는 차트 */}
        </ReportItem>
        <ReportItem>
          <h3>전체 항목: 누락 항목</h3>
          {/* 누락 항목에 대한 내용 또는 차트 */}
        </ReportItem>
      </ReportContent>
    </ReportContainer>
  );
};

export default DataReport;
