import React, { createContext, useState } from 'react';

// Context 생성
export const AnalysisContext = createContext();

// Provider 컴포넌트 정의
export const AnalysisProvider = ({ children }) => {
    const [dataQualityResults, setDataQualityResults] = useState(false);
    const [visualizationResults, setVisualizationResults] = useState(false);
    const [tableData, setTableData] = useState(null); 
    const [chartData, setChartData] = useState(null); 
    const [tableHeight, setTableHeight] = useState(0); 
    const [chartHeight, setChartHeight] = useState(0); 

    return (
        <AnalysisContext.Provider value={{ 
            dataQualityResults, 
            setDataQualityResults, 
            visualizationResults, 
            setVisualizationResults,
            tableData,        
            setTableData,
            chartData,
            setChartData,
            tableHeight, 
            setTableHeight,
            chartHeight, 
            setChartHeight,
        }}>
            {children}
        </AnalysisContext.Provider>
    );
};
