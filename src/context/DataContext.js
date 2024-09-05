import React, { createContext, useState } from 'react';

// Context 생성
export const DataContext = createContext();

// Provider 컴포넌트 생성
export const DataProvider = ({ children }) => {
  const [analyzedData, setAnalyzedData] = useState(null);  // 분석된 데이터를 저장할 상태

  return (
    <DataContext.Provider value={{ analyzedData, setAnalyzedData }}>
      {children}
    </DataContext.Provider>
  );
};
