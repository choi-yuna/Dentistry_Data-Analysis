import React from 'react';
import styled from 'styled-components';

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

const VisualizationDataTable = ({ tableData }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {tableData.headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Td key={cellIndex}>{cell}</Td>
              ))}
            </tr>
          ))}
          <tr>
            <ColSpanTd colSpan={tableData.headers.length - 1}>합계</ColSpanTd>
            <Td>{tableData.total}</Td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default VisualizationDataTable;
