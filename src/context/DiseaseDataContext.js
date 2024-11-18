import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Context 생성
const DiseaseDataContext = createContext();

// Context를 사용하기 위한 커스텀 훅
export const useDiseaseData = () => useContext(DiseaseDataContext);

// Provider 컴포넌트 정의
export const DiseaseDataProvider = ({ children }) => {
  const [data, setData] = useState(null); // 서버에서 가져온 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  // 데이터 Fetch 함수
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:8080/api/dashboard');
          console.log('API 응답 전체:', response); 
          setData(response.data);
        } catch (err) {
          console.error('API 호출 실패:', err);
          setError('데이터를 가져오는 중 오류가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      };
    fetchData();
  }, []);

  return (
    <DiseaseDataContext.Provider value={{ data, loading, error }}>
      {children}
    </DiseaseDataContext.Provider>
  );
};
