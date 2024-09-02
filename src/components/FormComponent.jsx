import React, { useState } from 'react';
import styled from 'styled-components';
import chartIcon from '../assets/images/chart-button.svg';

const FormContainer = styled.div`
    padding: 10px 70px;
    border-radius: 5px;
    display: flex;
    width: ${(props) => (props.collapsed ? '90%' : '70%')};
    background: #E7ECEE;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    gap: 15px;
    box-sizing: border-box;
    margin-top: 20px;
    transition: width 0.3s ease, height 0.3s ease;

`;

const PageContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 60px;

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

const FormComponent = ({ collapsed, onAnalyze  }) => {
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
        console.log(`Institution: ${institution}, Disease: ${disease}`);
        onAnalyze();
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
                                <option value="institution1">원광대학교</option>
                                <option value="institution2">고려대학교</option>
                                <option value="institution3">서강대학교</option>
                            </Select>
                        </LabelSelectGroup>
                    </FormGroup>
                    <FormGroup>
                        <LabelSelectGroup>
                            <Label htmlFor="disease">질환 :</Label>
                            <Select id="disease" value={disease} onChange={handleDiseaseChange}>
                                <option value="">선택하세요</option>
                                <option value="disease1">치주질환</option>
                                <option value="disease2">두개안면</option>
                                <option value="disease3">구강암</option>
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