import React, { useContext } from "react";
import styled from 'styled-components';
import VisualPieChart from './VisualPieChart'; 
import DownloadIcon from '../assets/images/download.svg'; 
import PrintIcon from '../assets/images/printer.svg'; 
import { AnalysisContext } from '../context/AnalysisContext';  // Context 불러오기

const ResultCtn = styled.div`
    width: 100%; 
    margin-top: 20px;
    transition: width 0.3s ease, height 0.3s ease;
`;

const FormCtn = styled.div`
    padding: 30px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 90%;
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

const PieChartResult = () => {
    const { chartData } = useContext(AnalysisContext);  // 전역 상태에서 chartData를 가져옴
  // chartData 유효성 검사
  if (!chartData || chartData.length === 0) {
    return <p>차트 데이터를 로드할 수 없습니다.</p>;
  }

    return (
        <ResultCtn>
        {chartData.map((chart, index) => (
          <FormCtn key={index}>
            <TitleBar>
              <SubTitle>{chart.title || "차트 제목"}</SubTitle>
              
                <IconContainer>
                <Icon src={DownloadIcon} alt="Download" />
                <Icon src={PrintIcon} alt="Print" />
                </IconContainer>
            </TitleBar>
            <VisualPieChart chart={chart} /> {/* chart 데이터를 직접 전달 */}
          </FormCtn>
        ))}
      </ResultCtn>
    );
};

export default PieChartResult;