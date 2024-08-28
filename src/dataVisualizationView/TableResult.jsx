import React from "react";
import styled from 'styled-components';
import VisualizationDataTable from './VisualizationDataTable';
import DownloadIcon from '../assets/images/download.svg'; 
import PrintIcon from '../assets/images/printer.svg'; 

const ResultCtn = styled.div`
    width: 80%; 
    margin-top: 20px;
`;

const FormCtn = styled.div`
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    background: #FAF8F8;
    box-shadow: 0px 4px 4px rgba(12, 12, 13, 0.40);
    box-sizing: border-box; 
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

//TODO:- 다운로드 기능
const handleDownload = () => {
    alert('Downloading report...');
  };
  
//TODO:- 인쇄 기능
  const handlePrint = () => {
    alert('Printing report...');
    
  };
  

const TableResult = ({ tablesData }) => {
    return (
        <ResultCtn>
            {tablesData.map((table, index) => (
                <FormCtn key={index}>
                    <TitleBar>
                        <SubTitle>{table.subTitle}</SubTitle>
                        <IconContainer>
                            <Icon src={DownloadIcon} alt="Download" onClick={() => table.onDownload && table.onDownload()} />
                            <Icon src={PrintIcon} alt="Print" onClick={() => table.onPrint && table.onPrint()} />
                        </IconContainer>
                    </TitleBar>
                    <VisualizationDataTable tableData={table.data} />
                </FormCtn>
            ))}
        </ResultCtn>
    );
};

export default TableResult;
