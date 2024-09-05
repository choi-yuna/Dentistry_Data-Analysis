import React, { useState,useContext  } from 'react';
import styled from 'styled-components';
import chartIcon from '../assets/images/chart-button.svg';
import { analyzeData } from '../utils/dataAnalysis';
import { analyzeItems } from '../utils/itemAnalysis';
import { calculateQualityRate } from '../utils/qualityAnalysis';
import { calculateOverallQuality } from '../utils/overallAnalysis'; 
import { fetchPatientData } from '../api/fileUploadApi';
import { useFileContext } from '../FileContext'; // Context에서 fileId 가져오기
import { DataContext } from '../context/DataContext';
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
    const [institution, setInstitution] = useState('');
    const [disease, setDisease] = useState('');

    const { fileId } = useFileContext();
    const { setAnalyzedData } = useContext(DataContext); 
    const handleInstitutionChange = (e) => {
        setInstitution(e.target.value);
    };

    const handleDiseaseChange = (e) => {
        setDisease(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!fileId) {
                console.warn("파일이 업로드되지 않았습니다.");
                return;
            }
            if (!institution || !disease) {
                console.warn('기관과 질환을 모두 선택해야 합니다.');
                return;
            }

            // 서버에서 반환된 데이터의 형식을 명확하게 처리
            const { data: patientData = [] } = await fetchPatientData(fileId, institution, disease);

            if (!patientData || patientData.length === 0) {
                console.warn("서버에서 데이터를 받지 못했습니다.");
                return;
            }

            console.log('서버에서 받은 분석된 데이터:', patientData);

            
            // 서버에서 받은 데이터를 바로 분석 수행
            const { nullCount, invalidCount, completenessRatio, validityRatio } = analyzeData(patientData);
            const { totalItems, missingItemCount, invalidItemCount, completenessRatio: itemCompletenessRatio, validityRatio: itemValidityRatio } = analyzeItems(patientData);
            const { totalPatients, validPatientCount, patientQualityRate, validItemCount, itemQualityRate } = calculateQualityRate(patientData);
            const { overallPatients, overallItems, overallValidPatients, overallPatientQualityRate, overallValidItems, overallItemQualityRate } = calculateOverallQuality(patientData);


            
            // 분석된 데이터를 전역적으로 저장
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

            // 부모 컴포넌트로 분석된 데이터를 전달
            onAnalyze(analyzedData);
            setAnalyzedData(analyzedData); 

        } catch (error) {
            console.error('데이터를 불러오는데 오류가 발생했습니다:', error);
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
                        <Button type="submit">
                            데이터 분석
                            <img src={chartIcon} alt="아이콘" />
                        </Button>
                    </AnalyzeButtonContainer>
                </FormInline>
            </FormContainer>
        </PageContainer>
    );
};

export default FormComponent;