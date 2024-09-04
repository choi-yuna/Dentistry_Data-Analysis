// FileContext.js
import React, { createContext, useState, useContext } from 'react';

// 1. Context 생성
const FileContext = createContext();

// 2. Context Provider 생성 (전역 상태를 관리할 컴포넌트)
export const FileProvider = ({ children }) => {
    const [fileId, setFileId] = useState(null);

    return (
        <FileContext.Provider value={{ fileId, setFileId }}>
            {children}
        </FileContext.Provider>
    );
};

// 3. Context 값을 사용할 수 있게 하는 커스텀 훅
export const useFileContext = () => {
    return useContext(FileContext);
};
