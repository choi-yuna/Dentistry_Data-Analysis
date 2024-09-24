import React, { useContext, useRef, useEffect } from "react";
import styled from 'styled-components';
import VisualizationDataTable from './VisualizationDataTable'; 
import DownloadIcon from '../assets/images/download.svg'; 
import PrintIcon from '../assets/images/printer.svg'; 
import { AnalysisContext } from '../context/AnalysisContext';

const ResultCtn = styled.div`
    width: 100%; 
    margin-top: 20px;
    transition: width 0.3s ease, height 0.3s ease;
`;

const FormCtn = styled.div`
    padding: 50px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 70vh; 
    background: #FAF8F8;
    box-shadow: 0px 4px 4px rgba(12, 12, 13, 0.40);
    box-sizing: border-box; 
    overflow: auto; /* 필요 시 스크롤 추가 */
`;

const TitleBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const SubTitle = styled.h3`
    margin: 2px;
    font-size: 18px;
    font-weight: bold; 
`;

const IconContainer = styled.div`
  display: flex; 
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
  cursor: pointer;
  margin-left: 10px;
`;

// 테이블 데이터가 없을 때 고정된 높이를 위한 스타일 컴포넌트
const EmptyTableMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #333;
`;

const TableResult = () => {
    const { tableData } = useContext(AnalysisContext);

    if (!tableData || tableData.length === 0) {
        return (
            <ResultCtn>
                <FormCtn> {/* 항상 화면의 35% 높이로 설정 */}
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
                        <IconContainer>
                            <Icon src={DownloadIcon} alt="Download" />
                            <Icon src={PrintIcon} alt="Print" />
                        </IconContainer>
                    </TitleBar>
                    <VisualizationDataTable tableId={table.id} />
                </FormCtn>
            ))}
        </ResultCtn>
    );
};

export default TableResult;
