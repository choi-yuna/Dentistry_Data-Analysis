import axios from 'axios';
const apiClient = axios.create({
    baseURL: window.location.hostname === '202.86.11.19'
      ? process.env.REACT_APP_API_URL_EXTERNAL // 외부망
      : process.env.REACT_APP_API_URL_INTERNAL // 내부망
  });

export const fetchFileErrorData = async (institutionId, diseaseClass) => {
    try {
        const requestData = { institutionId, diseaseClass }; // 요청 데이터 객체로 묶기
        console.log('전송할 데이터:', requestData);

        const response = await apiClient.post(
            '/api/error-analyze',
            requestData, // 요청 본문 데이터
            {
                headers: {
                    'Content-Type': 'application/json', // JSON 형식임을 명시
                },
            }
        );

        console.log('서버 응답 데이터:', response.data.data);
        return response.data.data; // 서버 응답 반환
    } catch (error) {
        console.error('Error fetching filtered patient data:', error.message);
        throw error; // 에러를 호출한 곳으로 전달
    }
};
