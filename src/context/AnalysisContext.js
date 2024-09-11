import React, { createContext, useState } from 'react';

export const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [visualizationResults, setVisualizationResults] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [chartData, setChartData] = useState(null);

  return (
    <AnalysisContext.Provider value={{ 
      visualizationResults, 
      setVisualizationResults, 
      tableData, 
      setTableData, 
      chartData, 
      setChartData 
    }}>
      {children}
    </AnalysisContext.Provider>
  );
};
