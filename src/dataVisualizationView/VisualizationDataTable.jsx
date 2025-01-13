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
const VisualizationDataTable = ({ tableId, sortedData }) => {
  const { tableData } = useContext(AnalysisContext);
  const table = sortedData || tableData.find((table) => table.id === tableId);
  console.log("테이블 데이터:", table);

  if (!table) {
    return <p>테이블 데이터를 로드할 수 없습니다.</p>;
  }

  const headers = table.headers || [];
  const labels = table.labels || [];
  const data = table.data || [];
  const percentages = table.percentages || [];

  // 데이터 정렬
  const combinedData = labels.map((label, index) => ({
    label,
    value: data[index],
    percentage: percentages[index],
  }));
  const sortedCombinedData = combinedData.sort((a, b) => a.label.localeCompare(b.label));

  const sortedLabels = sortedCombinedData.map((item) => item.label);
  const sortedValues = sortedCombinedData.map((item) => item.value);
  const sortedPercentages = sortedCombinedData.map((item) => item.percentage);

  const rows = sortedLabels.map((label, index) => [
    label,
    `${sortedValues[index]} (${sortedPercentages[index] ? `${sortedPercentages[index]}%` : 'N/A'})`,
  ]);

  const total = sortedValues.reduce((sum, current) => sum + current, 0);

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
