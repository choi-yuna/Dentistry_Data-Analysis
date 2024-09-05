import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { DataContext } from '../context/DataContext';

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
  width: 20%; /* 각 셀을 동일한 크기로 */
`;

const Td = styled.td`
  border: 2px solid black;
  padding: 10px;
  text-align: center;
  width: 20%; /* 각 셀을 동일한 크기로 */
`;

const ColSpanTd = styled.td`
  border: 2px solid black;
  padding: 10px;
  background-color: #C4C4C4;
  text-align: center;
  font-weight: bold;
  width: 30%; /* 각 셀을 동일한 크기로 */
`;

const MyTable = () => {
  const { analyzedData } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {!analyzedData && !loading && <div>분석할 데이터를 입력하세요</div>}

      {analyzedData && (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>데이터 종류</Th>
                <Th>환자 수</Th>
                <Th>비율</Th>
                <Th>항목 수</Th>
                <Th>비율</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <ColSpanTd>전체 데이터</ColSpanTd>
                <Td>{analyzedData.totalPatients || 0}</Td>
                <Td>{analyzedData.patientQualityRate?.toFixed(2) || '0.00'}%</Td>
                <Td>{analyzedData.totalItems || 0}</Td>
                <Td>{analyzedData.itemQualityRate?.toFixed(2) || '0.00'}%</Td>
              </tr>

              <tr>
                <ColSpanTd>임상 데이터 품질율</ColSpanTd>
                <Td>{analyzedData.validPatientCount || 0}</Td>
                <Td>{analyzedData.patientQualityRate?.toFixed(2) || '0.00'}%</Td>
                <Td>{analyzedData.validItemCount || 0}</Td>
                <Td>{analyzedData.itemQualityRate?.toFixed(2) || '0.00'}%</Td>
              </tr>

              <tr>
                <ColSpanTd>완전성</ColSpanTd>
                <Td>{analyzedData.totalPatients || 0}</Td>
                <Td>{analyzedData.completenessRatio?.toFixed(2) || '0.00'}%</Td>
                <Td>{analyzedData.totalItems || 0}</Td>
                <Td>{analyzedData.itemCompletenessRatio?.toFixed(2) || '0.00'}%</Td>
              </tr>

              <tr>
                <ColSpanTd>유효성</ColSpanTd>
                <Td>{analyzedData.totalPatients || 0}</Td>
                <Td>{analyzedData.validityRatio?.toFixed(2) || '0.00'}%</Td>
                <Td>{analyzedData.totalItems || 0}</Td>
                <Td>{analyzedData.itemValidityRatio?.toFixed(2) || '0.00'}%</Td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      )}

      {loading && <div>로딩 중...</div>}
    </div>
  );
};

export default MyTable;
