import React from "react";
import styled from 'styled-components';
import DataAnalysisTable from './dataAnalysisTable';

const ResultCtn = styled.div`
    width: 36%; 
    height: 45%; 
    margin-left:20px;
    margin-top: -30px;
`;

const FormCtn = styled.div`
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    background: #FAF8F8;
    box-shadow: 0px 4px 4px rgba(12, 12, 13, 0.40);
    box-sizing: border-box;
    position: relative;
`;

const TitleBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
`;

const Title = styled.h2`
    margin: 0;
    font-size: 18px;
    font-weight: 900; 
`;

const DetailButton = styled.button`
    padding: 10px 10px;
    border: none;
    border-radius: 10px;
    background-color: #2176A8;
    color: white;
    font-weight: 900;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const DataAnalysisResults = () => {
    return (
        <ResultCtn>
            <FormCtn>
                <TitleBar>
                    <Title>데이터 분석결과</Title>
                    <DetailButton>품질 이상 항목 세부보기</DetailButton>
                </TitleBar>
                <DataAnalysisTable />
            </FormCtn>
        </ResultCtn>
    );
};

export default DataAnalysisResults;
