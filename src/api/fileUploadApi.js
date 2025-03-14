import axios from 'axios';

const apiClient = axios.create({
    baseURL: window.location.hostname === '202.86.11.19'
      ? process.env.REACT_APP_API_URL_EXTERNAL // 외부망
      : process.env.REACT_APP_API_URL_INTERNAL // 내부망
  });

// 다중 파일을 업로드하는 함수
export const uploadExcelFiles = async (files) => {
    try {
        const formData = new FormData();
        
        // 여러 파일을 FormData에 추가
        files.forEach((file, index) => {
            formData.append(`files`, file); // 여러 파일을 'files'라는 이름으로 전송
        });

        const response = await apiClient.post('/api/upload-folder', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // 파일을 업로드하는 요청임을 명시
            },
        });

        console.log('Server response:', response.data);
        return response.data.fileIds; // 서버에서 반환한 fileIds 리스트 받음
    } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
    }
};

// 다중 파일 ID를 사용한 데이터 분석 함수
export const fetchPatientData = async (fileIds, institutionId, diseaseClass) => {
    try {
        console.log('전송할 데이터:', { fileIds, institutionId, diseaseClass }); 
        const response = await apiClient.post('/api/analyze', {
            fileIds: fileIds,   // 배열로 전달
            institutionId: institutionId,
            diseaseClass: diseaseClass,
        });

        return response.data;
    } catch (error) {
        console.error('Error analyzing data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

