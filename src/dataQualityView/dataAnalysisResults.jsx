import React, { useState, useContext,useEffect } from 'react'; 
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
    background-color: #2176A8;
    color: white;
    font-weight: 900;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const DataAnalysisResults = ({ collapsed }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { analyzedData } = useContext(DataContext); 
    const { originalPatientData } = useContext(DataContext);
    const [excelData, setExcelData] = useState([]);

    // useEffect를 사용해 originalPatientData가 변경될 때 excelData를 동적으로 업데이트
    useEffect(() => {
        if (originalPatientData && originalPatientData.length > 0) {
            // originalPatientData의 첫 번째 객체의 키를 사용하여 헤더 생성
            const headers = Object.keys(originalPatientData[0]);

            // 각 객체의 값을 배열로 변환하여 데이터 생성
            const rows = originalPatientData.map(item => Object.values(item));

            // headers와 rows를 결합하여 excelData로 설정
            setExcelData([headers, ...rows]);
        }
    }, [originalPatientData]);

    const handleDetailButtonClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    console.log('DataAnalysisResults 컴포넌트에서 받은 데이터:', analyzedData);
    console.log('컴포넌트에서 받은 데이터:', originalPatientData);

    // analyzedData가 null이거나 undefined인 경우 DataAnalysisTable을 렌더링하지 않음
    return (
        <ResultCtn $collapsed={collapsed}>
            <FormCtn>
                <TitleBar>
                    <Title>데이터 분석결과</Title>
                    <DetailButton onClick={handleDetailButtonClick}>품질 이상 항목 세부보기</DetailButton>
                </TitleBar>
                {/* analyzedData가 유효한 객체일 때만 렌더링 */}
                {analyzedData && Object.keys(analyzedData).length > 0 ? (
                    <DataAnalysisTable analyzedData={analyzedData} />
                ) : (
                    <p>분석할 데이터가 없습니다.</p>
                )}
            </FormCtn>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} excelData={excelData} />
        </ResultCtn>
    );
};

export default DataAnalysisResults;
