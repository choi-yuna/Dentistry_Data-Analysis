// src/context/AnalysisContext.js
import React, { createContext, useState } from 'react';

export const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
    const [dataQualityResults, setDataQualityResults] = useState(false);
    const [visualizationResults, setVisualizationResults] = useState(false);

    return (
        <AnalysisContext.Provider value={{ 
            dataQualityResults, 
            setDataQualityResults, 
            visualizationResults, 
            setVisualizationResults 
        }}>
            {children}
        </AnalysisContext.Provider>
    );
};
