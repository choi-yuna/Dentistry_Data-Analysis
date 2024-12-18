import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';



// Context 생성
const DiseaseDataContext = createContext();

// Context를 사용하기 위한 커스텀 훅
export const useDiseaseData = () => useContext(DiseaseDataContext);

// Provider 컴포넌트 정의
export const DiseaseDataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasFetched = useRef(false); // 첫 요청 여부 추적

  const fetchData = async (refresh = false) => {
    try {
        console.log('[DEBUG] 서버 데이터 요청 시작', { refresh });
        setLoading(true);

        const response = await axios.post('http://localhost:8080/api/dashboard', null, {
            params: { refresh } // 쿼리 파라미터로 refresh 값을 전송
        });

        console.log('[DEBUG] 서버 응답:', response.data);
        setData(response.data);
        setError(null); // 성공 시 오류 상태 초기화
    } catch (err) {
        console.error('[ERROR] 서버 요청 실패:', err);

        // 409 상태 코드에 대한 처리
        if (err.response && err.response.status === 409) {
            alert('새로고침이 이미 진행 중입니다. 잠시만 기다려 주세요.');
        } else {
            // 기타 에러 처리
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
        }
    } finally {
        setLoading(false);
        console.log('[DEBUG] 데이터 요청 완료');
    }
};


  useEffect(() => {
    if (hasFetched.current) {
      console.log('[DEBUG] 이미 데이터를 가져왔으므로 요청을 건너뜁니다.');
      return;
    }

    hasFetched.current = true; // 첫 요청 이후 true로 설정
    fetchData();
  }, []); // 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행

  // Provider에서 refreshData 메서드 제공
  return (
    <DiseaseDataContext.Provider value={{ data, loading, error, refreshData: () => fetchData(true) }}>
      {children}
    </DiseaseDataContext.Provider>
  );
};
