import React, { useContext } from "react";
import styled from 'styled-components';
import VisualizationDataTable from './VisualizationDataTable'; 
import { AnalysisContext } from '../context/AnalysisContext';

const ResultCtn = styled.div`
    width: 60%; 
    margin-top: 5px;
    transition: width 0.3s ease, height 0.3s ease;
`;

const FormCtn = styled.div`
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 36vh; 
    background: #FAF8F8;
    box-shadow: 0px 4px 4px rgba(12, 12, 13, 0.40);
    box-sizing: border-box; 
    overflow: auto; 
`;

const TableCtn = styled.div`
    display: flex;
    justify-content: center; /* 테이블을 수평 중앙 정렬 */
    align-items: center; /* 테이블을 수직 중앙 정렬 (필요할 경우) */
`;

const TitleBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SubTitle = styled.h3`
    margin: 2px;
    font-size: 15px;
    font-weight: bold; 
`;

const EmptyTableMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #333;
`;

const DataTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
`;

const TableHeader = styled.th`
    padding: 8px;
    background-color: #f2f2f2;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

const TableCell = styled.td`
    padding: 8px;
    border: 1px solid #ddd;
`;

const TableResult = () => {
    const { tableData } = useContext(AnalysisContext);

    // tableData가 없을 때 처리
    if (!tableData || tableData.length === 0) {
        return (
            <ResultCtn>
                <FormCtn> 
                    <EmptyTableMessage>테이블 데이터를 로드할 수 없습니다.</EmptyTableMessage>
                </FormCtn>
            </ResultCtn>
        );
    }

    return (
        <ResultCtn>
            {tableData.map((table, index) => (
                <FormCtn key={index}>
                    <TitleBar>
                        <SubTitle>{table.title || "테이블 제목"}</SubTitle>
                    </TitleBar>
                    <TableCtn>
                        <VisualizationDataTable tableId={table.id} />
                    </TableCtn>
                    <DataTable>
                        <thead>
                            <tr>
                                {/* 서버에서 받은 headers를 테이블의 헤더로 표시 */}
                                {table.headers && table.headers.map((header, i) => (
                                    <TableHeader key={i}>{header}</TableHeader>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* labels와 data를 테이블 행으로 표시 */}
                            {table.labels && table.labels.map((label, i) => (
                                <TableRow key={i}>
                                    <TableCell>{label}</TableCell>
                                    <TableCell>
                                        {table.data[i]} ({table.percentages[i]}%)
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </DataTable>
                </FormCtn>
            ))}
        </ResultCtn>
    );
};

export default TableResult;
