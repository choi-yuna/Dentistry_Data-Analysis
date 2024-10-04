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
    padding: 18px;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 32vh;  
    background: #FAF8F8;
    box-shadow: 0px 4px 4px rgba(12, 12, 13, 0.20);
    box-sizing: border-box; 
    overflow: auto; 
`;

const TableCtn = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center; 
`;

const TitleBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SubTitle = styled.h3`
    margin: 2px;
    font-size: 13px;
    font-weight: bold; 
`;

const EmptyTableMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #333;
`;



const TableResult = () => {
    const { tableData } = useContext(AnalysisContext);
    console.log(tableData);

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
                </FormCtn>
            ))}
        </ResultCtn>
    );
};

export default TableResult;
