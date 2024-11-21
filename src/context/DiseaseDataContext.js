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
        console.log('[DEBUG] 데이터 요청 시작'); // 요청 시작 시점
        setLoading(true);
        const response = await axios.post('http://localhost:8080/api/dashboard'); // 서버 요청
        console.log('[DEBUG] 서버 응답 데이터:', response.data); // 서버 응답 데이터 확인
        setData(response.data); // 데이터 저장
      } catch (err) {
        console.error('[ERROR] 서버 요청 실패:', err.message || err); // 에러 메시지 확인
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
        console.log('[DEBUG] 데이터 요청 완료'); // 요청 완료
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
