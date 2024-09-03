// src/components/FormComponent.js
import React, { useState } from 'react';
import styled from 'styled-components';
import chartIcon from '../assets/images/chart-button.svg';
import { data } from '../data/DataModel';
import { analyzeData } from '../utils/dataAnalysis';
import { analyzeItems } from '../utils/itemAnalysis';
import { calculateQualityRate } from '../utils/qualityAnalysis';
import { calculateOverallQuality } from '../utils/overallAnalysis'; // 전체 데이터 분석 함수 import

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

    const handleInstitutionChange = (e) => {
        setInstitution(e.target.value);
    };

    const handleDiseaseChange = (e) => {
        setDisease(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 기존 환자 수 기준 분석
        const { nullCount, invalidCount, completenessRatio, validityRatio } = analyzeData(data, institution, disease);
        console.log(`널 값의 개수 (환자 수 기준): ${nullCount}`);
        console.log(`수정 필요 항목 환자 수 (환자 수 기준): ${invalidCount}`);
        console.log(`완전성 비율 (환자 수 기준): ${completenessRatio.toFixed(2)}%`);
        console.log(`유효성 비율 (환자 수 기준): ${validityRatio.toFixed(2)}%`);
        
        // 항목 수 기준 분석
        const { totalItems, missingItemCount, invalidItemCount, completenessRatio: itemCompletenessRatio, validityRatio: itemValidityRatio } = analyzeItems(data);
        console.log(`전체 항목 수: ${totalItems}`);
        console.log(`누락된 항목의 개수 (항목 수 기준): ${missingItemCount}`);
        console.log(`수정 필요 항목의 개수 (항목 수 기준): ${invalidItemCount}`);
        console.log(`개수 완전성 비율 (항목 수 기준): ${itemCompletenessRatio.toFixed(2)}%`);
        console.log(`유효성 비율 (항목 수 기준): ${itemValidityRatio.toFixed(2)}%`);

        // 품질율 분석
        const { totalPatients, totalItems: qualityTotalItems, validPatientCount, patientQualityRate, validItemCount, itemQualityRate } = calculateQualityRate(data);
        console.log(`총 환자 수: ${totalPatients}`);
        console.log(`총 항목 수: ${qualityTotalItems}`);
        console.log(`품질율 (환자 수 기준): ${patientQualityRate.toFixed(2)}%`);
        console.log(`품질율 (항목 수 기준): ${itemQualityRate.toFixed(2)}%`);

        // 전체 데이터 분석
        const { totalPatients: overallPatients, totalItems: overallItems, validPatientCount: overallValidPatients, patientQualityRate: overallPatientQualityRate, validItemCount: overallValidItems, itemQualityRate: overallItemQualityRate } = calculateOverallQuality(data);
        console.log(`전체 환자 수: ${overallPatients}`);
        console.log(`전체 항목 수: ${overallItems}`);
        console.log(`전체 품질율 (환자 수 기준): ${overallPatientQualityRate.toFixed(2)}%`);
        console.log(`전체 품질율 (항목 수 기준): ${overallItemQualityRate.toFixed(2)}%`);

        onAnalyze({
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
        });
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
