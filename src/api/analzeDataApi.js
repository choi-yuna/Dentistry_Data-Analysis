import axios from 'axios';

// 다중 파일 ID 및 필터링 조건을 사용한 데이터 분석 함수
export const fetchFilteredPatientData = async (fileIds, filters) => {
    try {
        // 서버로 전송할 데이터 객체 생성
        const requestData = {
            fileIds: fileIds, // 파일 ID 배열
            ...filters       // 필터 조건 (INSTITUTION_ID, P_GENDER 등)
        };

        console.log('Sending filter request:', requestData); // 전송 전에 요청 데이터를 출력

        const response = await axios.post('http://localhost:8080/api/analyze-filters', requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response from analyze-filters:', response.data);
        return response.data;  // 서버로부터 받은 필터링된 데이터를 반환
    } catch (error) {
        console.error('Error analyzing data with filters:', error.response ? error.response.data : error.message);
        throw error; // 오류 발생 시 예외 처리
    }
};
