import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Card = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
`;

const CardBody = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f1f1f1; /* 섹션 전체 배경 색상 추가 */
  border-radius: 8px;
`;

const Section = styled.div`
  margin: 0 10px;
  flex: 1;
  padding: 20px; /* 내부 패딩 추가 */
  background-color: white; /* 각 섹션 배경색을 흰색으로 설정 */
  border-radius: 8px; /* 섹션 테두리 둥글게 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* 살짝 그림자 추가 */
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #666;
  margin-bottom: 10px;
  text-align: center; /* 섹션 타이틀 중앙 정렬 */
  border-bottom: 1px solid #ddd; /* 타이틀 아래 구분선 추가 */
  padding-bottom: 10px; /* 구분선과 타이틀 간의 간격 */
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  font-size: 14px;
  padding: 5px 0;
  border-bottom: 1px solid #e0e0e0; /* 데이터 행 구분을 위한 하단 선 추가 */
`;

const Label = styled.span`
  color: #333;
  font-weight: 600;
`;

const Value = styled.span`
  color: #555;
  margin-left: 8px; /* 숫자와 텍스트 간에 간격 추가 */
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: bold;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  width: 100%;
  line-height: 1.8; /* 줄 간격을 약간 더 주어 가독성 향상 */
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
          <Card>
          <Header>
            <div>
              <Label>• 전체 환자 수(명):</Label>
              <Value>{formatNumber(analyzedData.totalPatients || 0)}</Value>
            </div>
            <div>
              <Label>• 전체 데이터 항목 수:</Label>
              <Value>{formatNumber(analyzedData.totalItems || 0)}</Value>
            </div>
          </Header>
            <CardBody>

              {/* 품질율 섹션 */}
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

              {/* 완전성 섹션 */}
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

              {/* 유효성 섹션 */}
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

            </CardBody>
          </Card>
        </>
      )}
    </Container>
  );
};

export default MyTable;
