import React, { useContext } from 'react';
import styled from 'styled-components';
import { AnalysisContext } from '../context/AnalysisContext';

const TableContainer = styled.div`
  display: flex;
  width: 90%;
  margin-top: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 90%;
`;

const Th = styled.th`
  border: 1px solid black;
  padding: 6px;
  background-color: #C4C4C4;
  text-align: center;
  font-weight: bold;
  font-size: 0.9rem;
`;

const Td = styled.td`
  border: 1px solid black;
  padding: 6px;
  text-align: center;
  font-size: 0.9rem;
`;

const ColSpanTd = styled.td`
  border: 1px solid black;
  padding: 6px;
  text-align: center;
  font-weight: bold;
  font-size: 0.9rem;
`;

const VisualizationDataTable = ({ tableId }) => {
  const { tableData } = useContext(AnalysisContext);

  const table = tableData.find(table => table.id === tableId);
  console.log("진짜 뭔데 이거...",table);


  if (!table) {
    return <p>테이블 데이터를 로드할 수 없습니다.</p>;
  }

  console.log("table.headers:", table.headers); 

  // headers, labels, data, percentages가 있는지 각각 확인
  const headers = table.headers || [];
  const labels = table.labels || [];
  const data = table.data || [];
  const percentages = table.percentages || [];

  const rows = labels.map((label, index) => [
    label,
    `${data[index]} (${percentages[index] ? `${percentages[index]}%` : 'N/A'})`
  ]);

  const total = data.length ? data.reduce((sum, current) => sum + current, 0) : 0;

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
          {rows.map((row, rowIndex) => (
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
