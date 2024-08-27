import React from "react";
import styled from 'styled-components';
import VisualizationDataTable from './VisualizationDataTable';
import DownloadIcon from '../assets/images/download.svg'; 
import PrintIcon from '../assets/images/printer.svg'; 

const ResultCtn = styled.div`
    width: 30%; 
    height: 5%; 
    margin-top: 50px;
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
   
`;

const TitleBar = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const Title = styled.h2`
    margin: 5px;
    font-size: 24px;
    font-weight: bold; 
    margin-right : 10px; 
`;

const SubTitle = styled.h3`
    margin: 2px;
    font-size: 18px;
    font-weight: bold; 
`;

const IconContainer = styled.div`
  display: flex; 
  margin-left : 10px;
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
  cursor: pointer;
  margin : 5px;
  margin-top : 10px; 

`;
const TableResult = () => {
    return (
        <ResultCtn>
            <FormCtn>
                <TitleBar>
                       
                        <IconContainer>
                            <Title>리포트 결과</Title>
                                <Icon src={DownloadIcon} alt="Download" />
                                <Icon src={PrintIcon} alt="Print" />
                        </IconContainer>
          
                        <SubTitle>● 기관별 환자수/비율</SubTitle>
                </TitleBar>
                <VisualizationDataTable />
            </FormCtn>
        </ResultCtn>
    );
};

export default TableResult;
