import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchAndAnalyzeData } from '../utils/fetchData'; // 분석 및 데이터 받아오는 함수

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto;
`;

const Th = styled.th`
  border: 2px solid black;
  padding: 10px;
  background-color: #C4C4C4;
  text-align: center;
  width: 16.66%; 
`;

const Td = styled.td`
  border: 2px solid black;
  padding: 10px;
  text-align: center;
  width: 16.66%; 
`;

const EmptyTh = styled.th`
  border: 2px solid black;
  padding: 10px;
  background-color: #C4C4C4;
  text-align: center;
  width: 33%; 
`;

const ColSpanTd = styled.td`
  border: 2px solid black;
  padding: 10px;
  background-color: #C4C4C4;
  text-align: center;
  font-weight: bold;
  width: 33.33%;
`;

const MyTable = ({ fileId, institutionId, diseaseClass }) => {
  const [analyzedData, setAnalyzedData] = useState(null);  // 분석 결과 상태 추가
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가

  // 서버에서 데이터를 받아오고 분석
  useEffect(() => {
    const getDataAndAnalyze = async () => {
      try {
        const analysisResult = await fetchAndAnalyzeData(fileId, institutionId, diseaseClass);  // 데이터 받아와서 분석
        setAnalyzedData(analysisResult);  // 분석된 데이터 상태에 저장
      } catch (error) {
        console.error('데이터 분석 중 오류 발생:', error);
      } finally {
        setLoading(false);  
      }
    };

    getDataAndAnalyze();
  }, [fileId, institutionId, diseaseClass]);  // fileId, institutionId, diseaseClass가 변경될 때마다 실행

  // 로딩 중일 때 로딩 메시지 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // analyzedData가 없을 때 에러 메시지 표시
  if (!analyzedData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }


  const {
    totalPatients,
    patientQualityRate,
    totalItems,
    itemQualityRate,
    completenessRatio,
    validityRatio,
  } = analyzedData;

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <EmptyTh colSpan="2"></EmptyTh>
            <Th colSpan="2">환자</Th>
            <Th colSpan="2">항목</Th>
          </tr>
          <tr>
            <EmptyTh colSpan="2"></EmptyTh>
            <Th>명</Th>
            <Th>비율</Th>
            <Th>개</Th>
            <Th>비율</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <ColSpanTd colSpan="2">전체데이터</ColSpanTd>
            <Td>{totalPatients}</Td>
            <Td>{patientQualityRate.toFixed(2)}%</Td>
            <Td>{totalItems}</Td>
            <Td>{itemQualityRate.toFixed(2)}%</Td>
          </tr>
          <tr>
            <ColSpanTd colSpan="2">임상데이터 품질율</ColSpanTd>
            <Td>{totalPatients}</Td>
            <Td>{patientQualityRate.toFixed(2)}%</Td>
            <Td>{totalItems}</Td>
            <Td>{itemQualityRate.toFixed(2)}%</Td>
          </tr>
          <tr>
            <ColSpanTd colSpan="2">완전성</ColSpanTd>
            <Td>{totalPatients}</Td>
            <Td>{completenessRatio.toFixed(2)}%</Td>
            <Td>{totalItems}</Td>
            <Td>{completenessRatio.toFixed(2)}%</Td>
          </tr>
          <tr>
            <ColSpanTd colSpan="2">유효성</ColSpanTd>
            <Td>{totalPatients}</Td>
            <Td>{validityRatio.toFixed(2)}%</Td>
            <Td>{totalItems}</Td>
            <Td>{validityRatio.toFixed(2)}%</Td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
