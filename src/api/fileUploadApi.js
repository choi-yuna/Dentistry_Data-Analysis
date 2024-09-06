import axios from 'axios';


export const uploadZipFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // 파일을 formData에 추가

        const response = await axios.post('http://localhost:8080/api/upload-zip', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // 파일을 업로드하는 요청임을 명시
            },
        });
        console.log('Server response:', response.data);
        return response.data.fileId; // 서버에서 반환한 fileId를 받음
    } catch (error) {
        console.error('Error uploading ZIP file:', error);
        throw error;
    }
};

export const fetchPatientData = async (fileId, institutionId, diseaseClass) => {
    try {
        console.log('전송할 데이터:', { fileId, institutionId, diseaseClass }); 
        const response = await axios.post('http://localhost:8080/api/analyze', {
            fileId: fileId,
            institutionId: institutionId,
            diseaseClass: diseaseClass,
        });

        console.log('Response from analyze:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error analyzing data:', error.response ? error.response.data : error.message);
        throw error;
    }
};


// 질환 데이터를 가져오는 API 함수
export const fetchDiseaseData = async (disease) => {
    try {
      const response = await axios.get(`/api/diseases/${disease}`);
      
      if (response && response.data) {
        return response.data;  // 데이터를 반환
      } else {
        throw new Error('데이터를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('질환 데이터를 가져오는 중 오류 발생:', error);
      throw error;  // 오류 발생 시 호출자에게 오류를 던짐
    }
  };