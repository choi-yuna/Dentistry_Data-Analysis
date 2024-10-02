import React from 'react';
import styled from 'styled-components';
import PieChart from './piechart';  // 차트 컴포넌트 import

const Container = styled.div`
  margin: 1px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Card = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  justify-content: space-between; /* 좌우 정렬 */
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

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px; /* 폰트 크기 축소 */
  padding: 5px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const Label = styled.span`
  color: #333;
  font-weight: bold;
`;

const Value = styled.span`
  color: #555;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  max-height: 293px; /* 컨테이너의 최대 높이 설정 */
  overflow-y: auto; /* 스크롤이 생기도록 설정 */
  padding: 5px;
`;

const Header = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #ddd;
  margin-left : 20px;
`;

const HeaderItem = styled.div`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.5;
  color: #333;
  text-align: left;
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

          {/* 품질율, 완전성, 유효성 테이블 */}
          <Card>
            <Section>
              <SectionTitle>품질율</SectionTitle>
              <DataRow>
                <Label>항목 수</Label>
                <Value>{formatNumber(analyzedData.totalItems - (analyzedData.invalidItemCount + analyzedData.missingItemCount) || 0)}</Value>
              </DataRow>
              <DataRow>
                <Label>비율(%)</Label>
                <Value>{analyzedData.qualityRatio?.toFixed(2) || '0.00'}%</Value>
              </DataRow>
              <DataRow>
                <Label>환자 수(명)</Label>
                <Value>{formatNumber(analyzedData.totalPatients - analyzedData.invalidCount || 0)}</Value>
              </DataRow>
            </Section>

            <Section>
              <SectionTitle>완전성</SectionTitle>
              <DataRow>
                <Label>항목 수</Label>
                <Value>{formatNumber(analyzedData.totalItems - analyzedData.missingItemCount || 0)}</Value>
              </DataRow>
              <DataRow>
                <Label>비율(%)</Label>
                <Value>{analyzedData.itemCompletenessRatio?.toFixed(2) || '0.00'}%</Value>
              </DataRow>
              <DataRow>
                <Label>환자 수(명)</Label>
                <Value>{formatNumber(analyzedData.totalPatients - analyzedData.nullCount || 0)}</Value>
              </DataRow>
            </Section>

            <Section>
              <SectionTitle>유효성</SectionTitle>
              <DataRow>
                <Label>항목 수</Label>
                <Value>{formatNumber(analyzedData.totalItems - analyzedData.invalidItemCount || 0)}</Value>
              </DataRow>
              <DataRow>
                <Label>비율(%)</Label>
                <Value>{analyzedData.itemValidityRatio?.toFixed(2) || '0.00'}%</Value>
              </DataRow>
              <DataRow>
                <Label>환자 수(명)</Label>
                <Value>{formatNumber(analyzedData.totalPatients - analyzedData.invalidCount || 0)}</Value>
              </DataRow>
            </Section>
          </Card>

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
                          Number(analyzedData.totalItems) - Number(analyzedData.invalidItemCount) || 0,
                          Number(analyzedData.invalidItemCount) || 0,
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
