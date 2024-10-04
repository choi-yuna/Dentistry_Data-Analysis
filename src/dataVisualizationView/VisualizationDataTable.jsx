import React, { useContext } from 'react';
import styled from 'styled-components';
import { AnalysisContext } from '../context/AnalysisContext';

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 5px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 90%;
  margin-top: 8px;
  font-size: 0.9rem;
  background-color: #fff;
  border: 1px solid #8a8686;
`;

const Th = styled.th`
  padding: 5px;
  background-color: #e0e0e0;
  color: #333;
  text-align: center;
  font-weight: bold;
  font-size: 0.7rem;
  border: 1px solid #8a8686;
`;

const Td = styled.td`
  padding: 8px;
  text-align: center;
  border: 1px solid #8a8686;
  font-size: 0.7rem;
`;
const ColSpanTd = styled.td`
  padding: 8px;
  text-align: center;
  font-weight: bold;
  background-color: #f9f9f9;
  border: 1px solid #8a8686;
  font-size: 0.7rem;
`;

const VisualizationDataTable = ({ tableId }) => {
  const { tableData } = useContext(AnalysisContext);

  const table = tableData.find((table) => table.id === tableId);
  console.log("테이블 데이터:", table);

  if (!table) {
    return <p>테이블 데이터를 로드할 수 없습니다.</p>;
  }

  const headers = table.headers || [];
  const labels = table.labels || [];
  const data = table.data || [];
  const percentages = table.percentages || [];

  const rows = labels.map((label, index) => [
    label,
    `${data[index]} (${percentages[index] ? `${percentages[index]}%` : 'N/A'})`,
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
