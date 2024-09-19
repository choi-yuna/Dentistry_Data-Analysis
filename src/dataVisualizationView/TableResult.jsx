import React, { useContext, useRef, useEffect, useState } from "react";
import styled from 'styled-components';
import VisualizationDataTable from './VisualizationDataTable';
import DownloadIcon from '../assets/images/download.svg'; 
import PrintIcon from '../assets/images/printer.svg'; 
import { AnalysisContext } from '../context/AnalysisContext';

const ResultCtn = styled.div`
    width: 80%; 
    margin-top: 20px;
`;

const FormCtn = styled.div`
    padding: 30px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #FAF8F8;
    box-shadow: 0px 4px 4px rgba(12, 12, 13, 0.40);
    box-sizing: border-box;
    height: ${(props) => props.height ? `${props.height}px` : 'auto'};
    overflow: auto;  /* 내용이 넘칠 경우 스크롤 추가 */
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

const TableResult = () => {
    const { tableData, setTableHeight, chartHeight } = useContext(AnalysisContext);
    const tableRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState(0);

    // 테이블 높이를 계산하고, 전역 상태에 저장
    useEffect(() => {
        if (tableRef.current) {
            const tableHeight = tableRef.current.offsetHeight;
            setTableHeight(tableHeight);  // 테이블 높이 저장
            setMaxHeight(Math.max(tableHeight, chartHeight));  // 차트와 테이블 높이 비교 후 큰 값 사용
        }
    }, [chartHeight, setTableHeight]); // chartHeight 변경 시 테이블 높이를 다시 계산

    if (!tableData || tableData.length === 0) {
        return <p>테이블 데이터를 로드할 수 없습니다.</p>;
    }

    return (
        <ResultCtn>
            {tableData.map((table, index) => (
                <FormCtn key={index} ref={tableRef} height={maxHeight}>
                    <TitleBar>
                        <SubTitle>{table.title}</SubTitle>
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
