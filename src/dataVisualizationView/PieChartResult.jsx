import React, { useContext } from "react";
import styled from 'styled-components';
import VisualPieChart from './VisualPieChart'; 
import VisualLineChart from './VisualLineChart'; 
import VisualBarChart from './VisualBarChart'; 
import VisualMapChart from './VisualMapChart'; // 지도 시각화 컴포넌트 추가
import { AnalysisContext } from '../context/AnalysisContext'; 

const ResultCtn = styled.div`
    width: 100%; 
    margin-top: 5px;
    transition: width 0.3s ease, height 0.3s ease;
`;

const FormCtn = styled.div`
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 36vh; 
    background: #FAF8F8;
    box-shadow: 0px 4px 4px rgba(12, 12, 13, 0.40);
    box-sizing: border-box; 
`;

const TitleBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const SubTitle = styled.h3`
    margin: 2px;
    font-size: 15px;
    font-weight: bold; 
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

    const getChartType = (id) => {
        const barChartIds = ["P_AGE", "P_WEIGHT", "P_HEIGHT"];
        const lineChartIds = ["CAPTURE_TIME"];
        const mapChartIds = ["P_RES_AREA"]; // 거주 지역 차트 추가

        if (barChartIds.includes(id)) {
            return 'bar';
        } else if (lineChartIds.includes(id)) {
            return 'line';
        } else if (mapChartIds.includes(id)) {
            return 'map'; // 지도형 차트로
        }
        return 'pie';
    };

    const sortChartData = (chart) => {
        if (["P_AGE", "P_WEIGHT", "P_HEIGHT","CAPTURE_TIME"].includes(chart.id)) {
            const labelDataPairs = chart.labels.map((label, index) => {
                const number = parseInt(label.match(/\d+/));
                return { label, value: chart.data[index], number };
            });

            labelDataPairs.sort((a, b) => a.number - b.number);

            return {
                ...chart,
                labels: labelDataPairs.map(pair => pair.label),
                data: labelDataPairs.map(pair => pair.value),
            };
        }
        return chart;
    };

    return (
        <ResultCtn>
            {chartData.map((chart, index) => {
                const sortedChart = sortChartData(chart);

                return (
                    <FormCtn key={index}>
                        <TitleBar>
                            <SubTitle>{sortedChart.title || "차트 제목"}</SubTitle>
                        </TitleBar>
                        
                        {getChartType(sortedChart.id) === 'line' ? (
                            <VisualLineChart chart={sortedChart} />
                        ) : getChartType(sortedChart.id) === 'bar' ? (
                            <VisualBarChart chart={sortedChart} />
                        ) : getChartType(sortedChart.id) === 'map' ? (
                            <VisualMapChart chart={sortedChart} />  // 지도형 차트 사용
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
