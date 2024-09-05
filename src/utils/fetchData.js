import { fetchPatientData } from '../api/fileUploadApi'; // 서버에서 데이터를 가져오는 함수
import { analyzeData } from './dataAnalysis';
import { analyzeItems } from './itemAnalysis';
import { calculateQualityRate } from './qualityAnalysis';
import { calculateOverallQuality } from './overallAnalysis';

export const fetchAndAnalyzeData = async (fileId, institutionId, diseaseClass) => {
  try {
    const response = await fetchPatientData(fileId, institutionId, diseaseClass);

    const patientData = Array.isArray(response) ? response : response.data;
    console.log('서버에서 받은 데이터:', patientData);

    // 분석 로직 이전에 데이터가 유효한지 확인
    if (!Array.isArray(patientData) || patientData.length === 0) {
      throw new Error('유효한 데이터가 없습니다.');
    }

    // 데이터 분석
    const { nullCount, invalidCount, completenessRatio, validityRatio } = analyzeData(patientData);
    const { totalItems, missingItemCount, invalidItemCount, itemCompletenessRatio, itemValidityRatio } = analyzeItems(patientData);
    const { totalPatients, qualityTotalItems, validPatientCount, patientQualityRate, validItemCount, itemQualityRate } = calculateQualityRate(patientData);
    const { overallPatients, overallItems, overallValidPatients, overallPatientQualityRate, overallValidItems, overallItemQualityRate } = calculateOverallQuality(patientData);

    return {
      nullCount,
      invalidCount,
      completenessRatio,
      validityRatio,
      totalItems,
      missingItemCount,
      invalidItemCount,
      itemCompletenessRatio,
      itemValidityRatio,
      totalPatients,
      qualityTotalItems,
      validPatientCount,
      patientQualityRate,
      validItemCount,
      itemQualityRate,
      overallPatients,
      overallItems,
      overallValidPatients,
      overallPatientQualityRate,
      overallValidItems,
      overallItemQualityRate
    };
  } catch (error) {
    console.error('데이터 분석 중 오류 발생:', error.message);
    throw error;
  }
};
