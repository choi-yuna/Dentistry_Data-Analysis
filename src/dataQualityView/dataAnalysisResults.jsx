import React, { useState, useContext, useEffect } from 'react'; 
import styled from 'styled-components';
import DataAnalysisTable from './dataAnalysisTable';
import Modal from './Modal';
import { DataContext } from '../context/DataContext'; 

const ResultCtn = styled.div`
    width: ${(props) => (props.$collapsed ? '60%' : '38%')};
    height: 45%; 
    margin-left: ${(props) => (props.$collapsed ? '9%' : '20%')};
    margin-top: -30px;
    transition: width 0.3s ease, height 0.3s ease;
`;

const FormCtn = styled.div`
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    background: #FAF8F8;
    box-shadow: 0px 4px 4px rgba(12, 12, 13, 0.40);
    box-sizing: border-box;
    position: relative;
`;

const TitleBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
`;

const Title = styled.h2`
    margin: 0;
    font-size: 18px;
    font-weight: 900; 
`;

const DetailButton = styled.button`
    padding: 10px 10px;
    border: none;
    border-radius: 10px;
    background-color: ${(props) => (props.disabled ? '#cccccc' : '#2176A8')};
    color: white;
    font-weight: 900;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    &:hover {
        background-color: ${(props) => (props.disabled ? '#cccccc' : '#0056b3')};
    }
`;

const DataAnalysisResults = ({ collapsed }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { analyzedData } = useContext(DataContext); 
    const { originalPatientData } = useContext(DataContext);
    const [excelData, setExcelData] = useState([]);

    useEffect(() => {
        if (originalPatientData && originalPatientData.length > 0) {
            const headers = Object.keys(originalPatientData[0]);
            const rows = originalPatientData.map(item => Object.values(item));
            setExcelData([headers, ...rows]);
        }
    }, [originalPatientData]);

    const handleDetailButtonClick = () => {
        if (analyzedData && Object.keys(analyzedData).length > 0) {
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const isDataAvailable = analyzedData && Object.keys(analyzedData).length > 0;

    return (
        <ResultCtn $collapsed={collapsed}>
            <FormCtn>
                <TitleBar>
                    <Title>데이터 분석결과</Title>
                    <DetailButton onClick={handleDetailButtonClick} disabled={!isDataAvailable}>
                        품질 이상 항목 세부보기
                    </DetailButton>
                </TitleBar>
                {isDataAvailable ? (
                    <DataAnalysisTable analyzedData={analyzedData} />
                ) : (
                    <p>분석할 데이터가 없습니다.</p>
                )}
            </FormCtn>
            {isDataAvailable && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} excelData={excelData} />
            )}
        </ResultCtn>
    );
};

export default DataAnalysisResults;
