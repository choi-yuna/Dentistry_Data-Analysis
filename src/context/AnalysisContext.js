import React, { createContext, useState } from 'react';

// Context 생성
export const AnalysisContext = createContext();

// Provider 컴포넌트 정의
export const AnalysisProvider = ({ children }) => {
    const [dataQualityResults, setDataQualityResults] = useState(false);
    const [visualizationResults, setVisualizationResults] = useState(false);
    const [tableData, setTableData] = useState(null); // tableData 상태 추가
    const [chartData, setChartData] = useState(null); 
    return (
        <AnalysisContext.Provider value={{ 
            dataQualityResults, 
            setDataQualityResults, 
            visualizationResults, 
            setVisualizationResults,
            tableData,        // tableData를 Provider에 포함
            setTableData,
            chartData,
            setChartData,
        }}>
            {children}
        </AnalysisContext.Provider>
    );
};
