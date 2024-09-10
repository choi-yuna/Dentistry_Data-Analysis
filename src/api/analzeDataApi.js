import axios from 'axios';

export const fetchFilteredPatientData = async (filterRequest) => {
    try {
        console.log('전송할 데이터:', { filterRequest });
        // 서버에 전송할 데이터는 fileIds와 filters를 포함
        const response = await axios.post('http://localhost:8080/api/analyze-filters', filterRequest); // filters 내의 데이터를 전송);
        console.log('전송할 데이터:', { filterRequest });
        // 서버에서 응답을 정상적으로 받으면 데이터 반환
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered patient data:', error);
        throw error; // 에러가 발생하면 호출한 곳으로 전달
    }
};
