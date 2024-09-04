import { fetchPatientData } from '../api/fileUploadApi'; // 서버에서 데이터를 가져오는 함수
import { analyzeData } from './dataAnalysis';
import { analyzeItems } from './itemAnalysis';
import { calculateQualityRate } from './qualityAnalysis';
import { calculateOverallQuality } from './overallAnalysis';

// 서버에서 데이터를 받아와 분석까지 수행하는 함수
export const fetchAndAnalyzeData = async (fileId, institutionId, diseaseClass) => {
  try {
    // 서버에서 데이터 받아오기
    const response = await fetchPatientData(fileId, institutionId, diseaseClass);

    // 서버에서 받은 데이터가 배열이 아니면 배열로 변환
    const patientData = Array.isArray(response) ? response : response.data;
    console.log('서버에서 받은 데이터:', patientData);

    // 받은 데이터를 분석하는 로직
    const { nullCount, invalidCount, completenessRatio, validityRatio } = analyzeData(patientData);
    const { totalItems, missingItemCount, invalidItemCount, completenessRatio: itemCompletenessRatio, validityRatio: itemValidityRatio } = analyzeItems(patientData);
    const { totalPatients, totalItems: qualityTotalItems, validPatientCount, patientQualityRate, validItemCount, itemQualityRate } = calculateQualityRate(patientData);
    const { totalPatients: overallPatients, totalItems: overallItems, validPatientCount: overallValidPatients, patientQualityRate: overallPatientQualityRate, validItemCount: overallValidItems, itemQualityRate: overallItemQualityRate } = calculateOverallQuality(patientData);

    // 분석 결과 반환
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
    console.error('데이터를 받아오거나 분석하는 중 오류가 발생했습니다:', error);
    throw error;
  }
};
