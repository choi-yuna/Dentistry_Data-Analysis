import React, { createContext, useState } from 'react';

// Context 생성
export const DataSelectionContext = createContext();

// Provider 컴포넌트 정의
export const DataSelectionProvider = ({ children }) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedItemsTab1, setSelectedItemsTab1] = useState({});
  const [selectedItemsTab2, setSelectedItemsTab2] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');

  const value = {
    tabValue,
    setTabValue,
    selectedItemsTab1,
    setSelectedItemsTab1,
    selectedItemsTab2,
    setSelectedItemsTab2,
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <DataSelectionContext.Provider value={value}>
      {children}
    </DataSelectionContext.Provider>
  );
};
