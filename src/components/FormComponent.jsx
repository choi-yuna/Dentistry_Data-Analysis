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
    width: ${(props) => (props.collapsed ? '90%' : '78%')};
    background: #E7ECEE;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    gap: 15px;
    box-sizing: border-box;
    transition: width 0.3s ease, height 0.3s ease;
    margin-left: ${(props) => (props.collapsed ? '1%' : '11%')};
`;

const PageContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 35PX 50px;
    padding-bottom : 15px;
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

const ErrorMessage = styled.div`
    position: fixed;
    bottom: 20px;
    margin-bottom: 34%;
    left: 50%;
    transform: translateX(-50%);
    color: black;
    border-radius: 4px;
    font-size: 20px;
    font-weight: bold;
    z-index: 1000;
`;

const FormComponent = ({ collapsed, onAnalyze }) => {
    const [loading, setLoading] = useState(false);

    const { institution, setInstitution, disease, setDisease, setAnalyzedData, setOriginalPatientData } = useContext(DataContext);
    const { fileId } = useFileContext();

    const handleInstitutionChange = (e) => {
        setInstitution(e.target.value);
    };

    const handleDiseaseChange = (e) => {
        setDisease(e.target.value);
    };

    // 파일 업로드 후 분석
    const handleAnalyzeWithFile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAnalyzedData(null);

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

            setOriginalPatientData(patientData);

            const analyzedData = performDataAnalysis(patientData); // 공통 분석 함수 호출
            onAnalyze(analyzedData);
            setAnalyzedData(analyzedData);
        } catch (error) {
            console.error('데이터를 불러오는데 오류가 발생했습니다:', error);
        } finally {
            setLoading(false);
        }
    };

    // 파일 없이 분석
    const handleAnalyzeWithoutFile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAnalyzedData(null);

        try {
            if (!institution || !disease) {
                alert('기관과 질환을 모두 선택해야 합니다.');
                setLoading(false);
                return;
            }

            console.warn("파일 없이 분석 요청을 보냅니다.");

            // 서버에서 분석된 데이터를 직접 요청
            const { data: patientData = [] } = await fetchPatientData(null, institution, disease); // 파일 ID를 null로 전송

            if (!patientData || patientData.length === 0) {
                console.warn("서버에서 데이터를 받지 못했습니다.");
                setLoading(false);
                return;
            }

            setOriginalPatientData(patientData);

            const analyzedData = performDataAnalysis(patientData); // 공통 분석 함수 호출
            onAnalyze(analyzedData);
            setAnalyzedData(analyzedData);
        } catch (error) {
            console.error('분석 요청 중 오류가 발생했습니다:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyzeWithJson = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAnalyzedData(null);

        try {
            if (!institution || !disease) {
                alert('기관과 질환을 모두 선택해야 합니다.');
                setLoading(false);
                return;
            }

            console.warn("JSON 분석 요청을 보냅니다.");

            const { data: patientData = [] } = await fetchPatientData(["json"], institution, disease);

            if (!patientData || patientData.length === 0) {
                console.warn("서버에서 데이터를 받지 못했습니다.");
                setLoading(false);
                return;
            }

            setOriginalPatientData(patientData);

            const analyzedData = performDataAnalysis(patientData);
            onAnalyze(analyzedData);
            setAnalyzedData(analyzedData);
        } catch (error) {
            console.error('JSON 분석 요청 중 오류가 발생했습니다:', error);
        } finally {
            setLoading(false);
        }
    };

    // 공통 데이터 분석 함수
    const performDataAnalysis = (data) => {
        const { nullCount, invalidCount, totalCount, requiredCount, completenessRatio, validityRatio, totalNullCount, totalInvalidCount, totalCompletenessRatio, totalValidityRatio, totalRatio } = analyzeData(data);
        const { totalItems, items, missingItemCount, totalMissingItemCount, totalInvalidItemCount, invalidItemCount, totalItemCompletenessRatio, totalItemValidityRatio, totalQualityRatio, completenessRatio: itemCompletenessRatio, validityRatio: itemValidityRatio, qualityRatio, invalidItems } = analyzeItems(data);
        const { totalPatients, validPatientCount, patientQualityRate, validItemCount, itemQualityRate } = calculateQualityRate(data);
        const { overallPatients, overallItems, overallValidPatients, overallPatientQualityRate, overallValidItems, overallItemQualityRate } = calculateOverallQuality(data);

        return {
            nullCount,
            totalRatio,
            invalidCount,
            requiredCount,
            totalCount,
            completenessRatio,
            validityRatio,
            totalNullCount,
            totalInvalidCount,
            totalCompletenessRatio,
            totalValidityRatio,
            totalItems,
            items,
            totalMissingItemCount,
            totalInvalidItemCount,
            invalidItems,
            missingItemCount,
            invalidItemCount,
            itemCompletenessRatio,
            itemValidityRatio,
            totalItemCompletenessRatio,
            totalItemValidityRatio,
            totalQualityRatio,
            qualityRatio,
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
    };

    return (
        <PageContainer>
            <FormContainer collapsed={collapsed}>
                <FormInline>
                    <FormGroup>
                        <LabelSelectGroup>
                            <Label htmlFor="institution">기관 :</Label>
                            <Select id="institution" value={institution} onChange={handleInstitutionChange}>
                                <option value="">선택하세요</option>
                                <option value="0">ALL</option>
                                <option value="1">원광대</option>
                                <option value="2">고려대</option>
                                <option value="3">서울대</option>
                                <option value="4">국립암센터</option>
                                <option value="5">단국대</option>
                                <option value="6">조선대</option>
                                <option value="7">보라매병원</option>
                            </Select>
                        </LabelSelectGroup>
                    </FormGroup>
                    <FormGroup>
                        <LabelSelectGroup>
                            <Label htmlFor="disease">질환 :</Label>
                            <Select id="disease" value={disease} onChange={handleDiseaseChange}>
                                <option value="">선택하세요</option>
                                <option value="0">ALL</option>
                                <option value="A">치주질환</option>
                                <option value="B">골수염 (질환군)</option>
                                <option value="E">골수염 (대조군)</option>
                                <option value="C">구강암</option>
                                <option value="D">두개안면</option>
                            </Select>
                        </LabelSelectGroup>
                    </FormGroup>
                    <AnalyzeButtonContainer>
                        <Button type="button" onClick={handleAnalyzeWithFile} disabled={loading}>
                            {loading ? '로딩 중...' : '업로드 데이터 분석'}
                            {!loading && <img src={chartIcon} alt="아이콘" />}
                        </Button>
                        <Button type="button" onClick={handleAnalyzeWithoutFile} disabled={loading} style={{ marginLeft: '10px' }}>
                            {loading ? '로딩 중...' : 'CRF 데이터 분석'}
                            {!loading && <img src={chartIcon} alt="아이콘" />}
                        </Button>
                        <Button type="button" onClick={handleAnalyzeWithJson} disabled={loading} style={{ marginLeft: '10px' }}>
                            {loading ? '로딩 중...' : '라벨링 데이터 분석'}
                            {!loading && <img src={chartIcon} alt="아이콘" />}
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