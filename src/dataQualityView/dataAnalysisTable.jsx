import React from 'react';
import styled from 'styled-components';
import PieChart from './piechart';  // 차트 컴포넌트 import

// 기존에 누락된 컴포넌트들을 추가로 정의
const ChartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
  max-height: 293px; /* 컨테이너의 최대 높이 설정 */
  overflow-y: auto; /* 스크롤이 생기도록 설정 */
  padding: 5px;
`;

const Section = styled.div`
  flex: 1;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 0 10px; /* 각 섹션 간 간격 */
`;

const SectionTitle = styled.div`
  font-size: 13px; /* 크기 축소 */
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
`;

// 설명과 표를 나란히 배치하는 컨테이너
const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const DescriptionText = styled.td`
  font-size: 10px; /* 글씨 크기 약간 키움 */
  line-height: 1.6;
  color: #333;
  padding: 6px;
  text-align: left;
  background-color: #ffffff;
`;

// 그 외 기존 코드
const Container = styled.div`
  margin: 1px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const TableContainer = styled.div`
  width: 94%;
  margin: 9px 0; /* 설명과 표 사이 간격 추가 */
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-left:15px;
`;

const StyledTable = styled.table`
  width: 100%; /* 테이블 너비를 자동으로 조절 */
  border-collapse: collapse;
  font-size: 12px;
`;

const TableHeader = styled.th`
  background-color: #f0f0f0;
  padding: 8px;
  border: 1px solid #999; /* 테두리 색상 진하게 */
  text-align: center;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #999; /* 테두리 색상 진하게 */
`;

const TableCell = styled.td`
  padding: 8px;
  text-align: center;
  border: 1px solid #999; /* 테두리 색상 진하게 */
`;

const Header = styled.div`
  width: 100%;
  background-color: #FAF8F8;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid #ddd;
  margin-left: 20px;
`;

const HeaderItem = styled.div`
  font-size: 13px;
  font-weight: bold;
  line-height: 1.5;
  color: #333;
  text-align: left;
  margin-bottom: 3px;
`;

const MyTable = ({ analyzedData }) => {
  // 숫자에 쉼표 추가 함수
  const formatNumber = (num) => {
    return num?.toLocaleString() || 0;
  };

  return (
    <Container>
      {!analyzedData && <div>분석할 데이터를 입력하세요</div>}

      {analyzedData && (
        <>
          {/* Header 영역 */}
          <Header>
            <div>
              <HeaderItem>
                • 전체 환자 수(명): {formatNumber(analyzedData.totalPatients || 0)}
              </HeaderItem>
              <HeaderItem>
                • 전체 데이터 항목 수: {formatNumber(analyzedData.totalItems || 0)}
              </HeaderItem>
            </div>
          </Header>

          {/* 설명을 표 첫 행에 배치 */}
          <TableWrapper>
            <TableContainer>
              <StyledTable>
                <thead>
                <DescriptionText colSpan="4">
                      <b>품질율</b>: 전체 데이터 중 오류가 없고, 완전성과 유효성을 모두 만족하는 데이터의 비율.
                      <br />
                      <b>완전성</b>: 데이터가 누락되지 않고, 모든 필수 항목이 입력된 데이터의 비율.
                      <br />
                      <b>유효성</b>: 입력된 데이터가 정의된 형식, 범위, 규칙에 맞게 유효한 값으로 저장된 비율.
                    </DescriptionText>
                  <TableRow>
                    <TableHeader>구분</TableHeader>
                    <TableHeader>항목 수</TableHeader>
                    <TableHeader>비율(%)</TableHeader>
                    <TableHeader>환자 수(명)</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>품질율</TableCell>
                    <TableCell>{formatNumber(analyzedData.totalItems - (analyzedData.invalidItemCount + analyzedData.missingItemCount) || 0)}</TableCell>
                    <TableCell>{analyzedData.qualityRatio?.toFixed(2) || '0.00'}%</TableCell>
                    <TableCell>{formatNumber(analyzedData.totalPatients - analyzedData.invalidCount || 0)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingLeft: '20px' }}>↳ 완전성</TableCell>
                    <TableCell>{formatNumber(analyzedData.totalItems - analyzedData.missingItemCount || 0)}</TableCell>
                    <TableCell>{analyzedData.itemCompletenessRatio?.toFixed(2) || '0.00'}%</TableCell>
                    <TableCell>{formatNumber(analyzedData.totalPatients - analyzedData.nullCount || 0)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingLeft: '20px' }}>↳ 유효성</TableCell>
                    <TableCell>{formatNumber(analyzedData.totalItems - analyzedData.invalidItemCount || 0)}</TableCell>
                    <TableCell>{analyzedData.itemValidityRatio?.toFixed(2) || '0.00'}%</TableCell>
                    <TableCell>{formatNumber(analyzedData.totalPatients - analyzedData.invalidCount || 0)}</TableCell>
                  </TableRow>
                </tbody>
              </StyledTable>
            </TableContainer>
          </TableWrapper>

          {/* 분석 차트 */}
          <ChartContainer>
            <Section>
              <SectionTitle>품질율</SectionTitle>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <PieChart
                  title="항목 수"
                  data={{
                    labels: ['pass', 'fail'],
                    datasets: [
                      {
                        data: [
                          Number(analyzedData.totalItems) - (Number(analyzedData.invalidItemCount) + Number(analyzedData.missingItemCount)) || 0,
                          Number(analyzedData.invalidItemCount) + Number(analyzedData.missingItemCount) || 0,
                        ],
                        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                      },
                    ],
                  }}
                />
                <PieChart
                  title="환자 수"
                  data={{
                    labels: ['pass', 'fail'],
                    datasets: [
                      {
                        data: [
                          Number(analyzedData.totalPatients) - Number(analyzedData.invalidCount) || 0,
                          Number(analyzedData.invalidCount) || 0,
                        ],
                        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                      },
                    ],
                  }}
                />
              </div>
            </Section>

            <Section>
              <SectionTitle>완전성</SectionTitle>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <PieChart
                  title="항목 수"
                  data={{
                    labels: ['pass', 'fail'],
                    datasets: [
                      {
                        data: [
                          Number(analyzedData.totalItems) - Number(analyzedData.missingItemCount) || 0,
                          Number(analyzedData.missingItemCount) || 0,
                        ],
                        backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                      },
                    ],
                  }}
                />
                <PieChart
                  title="환자 수"
                  data={{
                    labels: ['pass', 'fail'],
                    datasets: [
                      {
                        data: [
                          Number(analyzedData.totalPatients) - Number(analyzedData.nullCount) || 0,
                          Number(analyzedData.nullCount) || 0,
                        ],
                        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                      },
                    ],
                  }}
                />
              </div>
            </Section>

            <Section>
              <SectionTitle>유효성</SectionTitle>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <PieChart
                  title="항목 수"
                  data={{
                    labels: ['pass', 'fail'],
                    datasets: [
                      {
                        data: [
                          Number(analyzedData.totalItems) - Number(analyzedData.invalidItemCount) || 0,
                          Number(analyzedData.invalidItemCount) || 0,
                        ],
                        backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                      },
                    ],
                  }}
                />
                <PieChart
                  title="환자 수"
                  data={{
                    labels: ['pass', 'fail'],
                    datasets: [
                      {
                        data: [
                          Number(analyzedData.totalPatients) - Number(analyzedData.invalidCount) || 0,
                          Number(analyzedData.invalidCount) || 0,
                        ],
                        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)'],
                      },
                    ],
                  }}
                />
              </div>
            </Section>
          </ChartContainer>
        </>
      )}
    </Container>
  );
};

export default MyTable;
