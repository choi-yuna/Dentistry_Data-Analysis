import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import chartIcon from '../assets/images/chart-button.svg';
import { analyzeData } from '../utils/dataAnalysis';
import { analyzeItems } from '../utils/itemAnalysis';
import { calculateQualityRate } from '../utils/qualityAnalysis';
import { calculateOverallQuality } from '../utils/overallAnalysis'; 
import { fetchPatientData } from '../api/fileUploadApi';
import { useFileContext } from '../FileContext'; 
import { DataContext } from '../context/DataContext';

// 로딩 스피너 애니메이션 정의
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; 
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 화면 최상단에 위치 */
`;

const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  color: #0d4a68;
  font-weight: bold;
`;

const FormContainer = styled.div`
    padding: 10px 60px;
    border-radius: 5px;
    display: flex;
    width: ${(props) => (props.collapsed ? '90%' : '70%')};
    background: #E7ECEE;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    gap: 15px;
    box-sizing: border-box;
    transition: width 0.3s ease, height 0.3s ease;
    margin-left: 3%;
`;

const PageContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 50px;
`;

const FormInline = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const FormGroup = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    flex-shrink: 0;
    color: #000;
`;

const LabelSelectGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Label = styled.label`
    margin-right: 10px;
    font-weight: bold;
    font-size: 14px;
    white-space: nowrap;
`;

const Select = styled.select`
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #fff;
    width: 150px;
    box-sizing: border-box; 
    flex-shrink: 0;
    margin-right: 20px;
`;

const AnalyzeButtonContainer = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 10px;
        width: 100%;
        justify-content: center;
    }
`;

const Button = styled.button`
    padding: 8px 16px;
    background-color: #0d4a68;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    height: 36px;
    box-sizing: border-box;
    min-width: 100px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%;
    }

    img {
        width: 20px;
        height: 20px;
        margin-left: 5px;
    }
`;

const FormComponent = ({ collapsed, onAnalyze }) => {
    const [loading, setLoading] = useState(false);  // 로딩 상태 추가
    const { institution, setInstitution, disease, setDisease, setAnalyzedData } = useContext(DataContext);
    const { fileId } = useFileContext();

    const handleInstitutionChange = (e) => {
        setInstitution(e.target.value);
    };

    const handleDiseaseChange = (e) => {
        setDisease(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // 로딩 상태를 true로 설정

        try {
            if (!fileId) {
                alert("파일이 업로드되지 않았습니다.");
                setLoading(false);
                return;
            }
            if (!institution || !disease) {
                alert('기관과 질환을 모두 선택해야 합니다.');
                setLoading(false);
                return;
            }

            const { data: patientData = [] } = await fetchPatientData(fileId, institution, disease);

            if (!patientData || patientData.length === 0) {
                console.warn("서버에서 데이터를 받지 못했습니다.");
                setLoading(false);
                return;
            }

            console.log('서버에서 받은 분석된 데이터:', patientData);

            const { nullCount, invalidCount, completenessRatio, validityRatio } = analyzeData(patientData);
            const { totalItems, missingItemCount, invalidItemCount, completenessRatio: itemCompletenessRatio, validityRatio: itemValidityRatio } = analyzeItems(patientData);
            const { totalPatients, validPatientCount, patientQualityRate, validItemCount, itemQualityRate } = calculateQualityRate(patientData);
            const { overallPatients, overallItems, overallValidPatients, overallPatientQualityRate, overallValidItems, overallItemQualityRate } = calculateOverallQuality(patientData);

            const analyzedData = {
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
                validPatientCount,
                patientQualityRate,
                validItemCount,
                itemQualityRate,
                overallPatients,
                overallItems,
                overallValidPatients,
                overallPatientQualityRate,
                overallValidItems,
                overallItemQualityRate,
            };

            onAnalyze(analyzedData);
            setAnalyzedData(analyzedData);
        } catch (error) {
            console.error('데이터를 불러오는데 오류가 발생했습니다:', error);
        } finally {
            setLoading(false);  // 데이터 로드 완료 후 로딩 상태를 false로 설정
        }
    };

    return (
        <PageContainer>
            <FormContainer collapsed={collapsed}>
                <FormInline onSubmit={handleSubmit}>
                    <FormGroup>
                        <LabelSelectGroup>
                            <Label htmlFor="institution">기관 :</Label>
                            <Select id="institution" value={institution} onChange={handleInstitutionChange}>
                                <option value="">선택하세요</option>
                                <option value="1">원광대</option>
                                <option value="2">고려대</option>
                                <option value="3">서울대</option>
                                <option value="5">단국대</option>
                                <option value="7">보라매병원</option>
                            </Select>
                        </LabelSelectGroup>
                    </FormGroup>
                    <FormGroup>
                        <LabelSelectGroup>
                            <Label htmlFor="disease">질환 :</Label>
                            <Select id="disease" value={disease} onChange={handleDiseaseChange}>
                                <option value="">선택하세요</option>
                                <option value="A">치주질환</option>
                                <option value="B">골수염</option>
                                <option value="C">두개안면</option>
                                <option value="D">구강암</option>
                            </Select>
                        </LabelSelectGroup>
                    </FormGroup>
                    <AnalyzeButtonContainer>
                        <Button type="submit" disabled={loading}> {/* 로딩 중일 때 버튼 비활성화 */}
                            {loading ? '로딩 중...' : '데이터 분석'}
                            {!loading && <img src={chartIcon} alt="아이콘" />} {/* 로딩 중이 아닐 때 아이콘 표시 */}
                        </Button>
                    </AnalyzeButtonContainer>
                </FormInline>
            </FormContainer>

            {loading && (
                <LoadingOverlay>
                    <LoadingMessage>
                        <Spinner />
                        <p>로딩 중...</p>
                    </LoadingMessage>
                </LoadingOverlay>
            )}
        </PageContainer>
    );
};

export default FormComponent;
