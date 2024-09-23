import React, { useContext } from 'react';
import styled from 'styled-components';
import { AnalysisContext } from '../context/AnalysisContext';  // Context를 불러옵니다

const TableContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
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

const VisualizationDataTable = ({ tableId }) => {
  const { tableData } = useContext(AnalysisContext);

  // tableId에 맞는 테이블 데이터를 찾음
  const table = tableData.find(table => table.id === tableId);

  const headers = table?.headers || [];
  const rows = table?.rows || [];
  const total = table?.total ?? rows.length;

  const sortedRows = [...rows].sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

  if (!tableData || !Array.isArray(tableData) || tableData.every(item => !item.rows || item.rows.length === 0)) {
    return <p>테이블 데이터를 로드할 수 없습니다.</p>;
}

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Td key={cellIndex}>{cell}</Td>
              ))}
            </tr>
          ))}
          <tr>
            <ColSpanTd colSpan={headers.length - 1}>합계</ColSpanTd>
            <Td>{total}</Td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default VisualizationDataTable;