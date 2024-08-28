import React from "react";
import styled from 'styled-components';
import VisualPieChart from './VisualPieChart'; 
import DownloadIcon from '../assets/images/download.svg'; 
import PrintIcon from '../assets/images/printer.svg'; 


const ResultCtn = styled.div`
    width: 100%; 
    margin-top: 20px;
`;

const FormCtn = styled.div`
    padding: 30px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 70%;
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

const PieChartResult = ({ chart }) => {
    return (
        <ResultCtn>
            <FormCtn>
                <TitleBar>
                    <SubTitle>{chart.subTitle}</SubTitle>
                    <IconContainer>
                        <Icon src={DownloadIcon} alt="Download" onClick={() => chart.onDownload && chart.onDownload()} />
                        <Icon src={PrintIcon} alt="Print" onClick={() => chart.onPrint && chart.onPrint()} />
                    </IconContainer>
                </TitleBar>
                <VisualPieChart chartData={chart.data} />
            </FormCtn>
        </ResultCtn>
    );
};

export default PieChartResult;
