import React, { useContext, useRef, useEffect } from "react";
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

    // 테이블 높이를 계산하고, 전역 상태에 저장
    useEffect(() => {
        if (tableRef.current) {
            setTableHeight(tableRef.current.offsetHeight);
        }
    }, [setTableHeight]);

    if (!tableData || tableData.length === 0) {
        return <p>테이블 데이터를 로드할 수 없습니다.</p>;
    }

    // 테이블과 차트의 최대 높이 비교
    const maxHeight = Math.max(chartHeight, tableRef.current?.offsetHeight || 0);

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
