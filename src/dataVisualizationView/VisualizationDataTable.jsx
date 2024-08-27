import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 90%;

`;

const Th = styled.th`
  border: 2px solid black;
  padding: 10px;
  background-color: #C4C4C4;
  text-align: center;
  font-weight: bold;
`;

const Td = styled.td`
  border: 2px solid black;
  padding: 10px;
  text-align: center;
`;

const ColSpanTd = styled.td`
  border: 2px solid black;
  padding: 10px;
  text-align: center;
  font-weight: bold;
`;

const VisualizationDataTable = () => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>기관명</Th>
            <Th>환자수(명)</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>고려대병원</Td>
            <Td></Td>
          </tr>
          <tr>
            <Td>단국대병원</Td>
            <Td></Td>
          </tr>
          <tr>
            <Td>보라매병원</Td>
            <Td></Td>
          </tr>
          <tr>
            <Td>서울대병원</Td>
            <Td></Td>
          </tr>
          <tr>
            <Td>원광대병원</Td>
            <Td></Td>
          </tr>
          <tr>
            <ColSpanTd>합계</ColSpanTd>
            <Td>50,0000</Td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default VisualizationDataTable;
