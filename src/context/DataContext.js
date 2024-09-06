import React, { createContext, useState } from 'react';

// 초기 데이터 상태
const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [institution, setInstitution] = useState('');
    const [disease, setDisease] = useState('');
    const [analyzedData, setAnalyzedData] = useState(null);
    const [originalPatientData, setOriginalPatientData] = useState(null);

    return (
        <DataContext.Provider value={{ institution, setInstitution, disease, setDisease, analyzedData, setAnalyzedData,originalPatientData, setOriginalPatientData }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
