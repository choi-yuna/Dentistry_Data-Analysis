import React from 'react';
import styled from 'styled-components';

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

const MyTable = () => {
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
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </tr>
          <tr>
            <ColSpanTd colSpan="2">임상데이터 품질율</ColSpanTd>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </tr>
          <tr>
            <ColSpanTd colSpan="2">완전성</ColSpanTd>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </tr>
          <tr>
            <ColSpanTd colSpan="2">유효성</ColSpanTd>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
