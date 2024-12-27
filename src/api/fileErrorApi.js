import axios from 'axios';

export const fetchFileErrorData = async (institution, disease) => {
    try {
        const requestData = { institution, disease }; // 요청 데이터 객체로 묶기
        console.log('전송할 데이터:', requestData);

        const response = await axios.post(
            'http://localhost:8080/api/error-analyze',
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
