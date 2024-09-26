import React, { useContext } from "react";
import styled from 'styled-components';
import VisualPieChart from './VisualPieChart'; 
import VisualLineChart from './VisualLineChart'; // VisualLineChart 임포트
import VisualBarChart from './VisualBarChart'; // 새로운 VisualBarChart 컴포넌트 임포트
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

const EmptyChartMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #333;
`;

const PieChartResult = () => {
    const { chartData } = useContext(AnalysisContext);

    if (!chartData || chartData.length === 0) {
        return (
            <ResultCtn>
                <FormCtn> 
                    <EmptyChartMessage>차트 데이터를 로드할 수 없습니다.</EmptyChartMessage>
                </FormCtn>
            </ResultCtn>
        );
    }

    // 특정 id 값에 따라 차트 유형을 결정하는 함수
    const getChartType = (id) => {
        const barChartIds = ["P_AGE", "P_WEIGHT", "P_HEIGHT"]; // 막대 그래프를 보여줄 id 목록
        const lineChartIds = ["CAPTURE_TIME"]; // 선 그래프를 보여줄 id 목록

        if (barChartIds.includes(id)) {
            return 'bar'; // 막대 그래프
        } else if (lineChartIds.includes(id)) {
            return 'line'; // 선 그래프
        }
        return 'pie'; // 기본 파이 차트
    };

    // 숫자 기반 차트 데이터를 정렬하는 함수
    const sortChartData = (chart) => {
        if (["P_AGE", "P_WEIGHT", "P_HEIGHT"].includes(chart.id)) {
            const labelDataPairs = chart.labels.map((label, index) => {
                const number = parseInt(label.match(/\d+/)); // 숫자 추출
                return { label, value: chart.data[index], number };
            });

            labelDataPairs.sort((a, b) => a.number - b.number); // 숫자 순으로 정렬

            return {
                ...chart,
                labels: labelDataPairs.map(pair => pair.label),
                data: labelDataPairs.map(pair => pair.value),
            };
        }
        return chart; // 숫자 기반이 아니면 원래 데이터 유지
    };

    return (
        <ResultCtn>
            {chartData.map((chart, index) => {
                const sortedChart = sortChartData(chart); // 차트 데이터 정렬

                return (
                    <FormCtn key={index}>
                        <TitleBar>
                            <SubTitle>{sortedChart.title || "차트 제목"}</SubTitle>
                            <IconContainer>
                                <Icon src={DownloadIcon} alt="Download" />
                                <Icon src={PrintIcon} alt="Print" />
                            </IconContainer>
                        </TitleBar>
                        
                        {getChartType(sortedChart.id) === 'line' ? (
                            <VisualLineChart chart={sortedChart} />
                        ) : getChartType(sortedChart.id) === 'bar' ? (
                            <VisualBarChart chart={sortedChart} />  
                        ) : (
                            <VisualPieChart chart={sortedChart} />  
                        )}
                    </FormCtn>
                );
            })}
        </ResultCtn>
    );
};

export default PieChartResult;
