import React, { useState, useContext } from 'react'; 
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

    const [excelData, setExcelData] = useState([
        ["Column1", "Column2", "Column3", "Column4", "Column5", "Column6", "Column7", "Column8"], 
        ["Data1", "Data2", "Data3", "Data4", "Data5", "Data6", "Data7", "Data8"],                
        ["Data9", "Data10", "Data11", "Data12", "Data13", "Data14", "Data15", "Data16"],        
        ["Data17", "Data18", "Data19", "Data20", "Data21", "Data22", "Data23", "Data24"],       
        ["Data25", "Data26", "Data27", "Data28", "Data29", "Data30", "Data31", "Data32"],         
    ]);

    const handleDetailButtonClick = () => {
        setModalOpen(true);

    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    console.log('DataAnalysisResults 컴포넌트에서 받은 데이터:', analyzedData);


    return (
        <ResultCtn $collapsed={collapsed}>
            <FormCtn>
                <TitleBar>
                    <Title>데이터 분석결과</Title>
                    {analyzedData && Object.keys(analyzedData).length > 0 && (
                        <DetailButton onClick={handleDetailButtonClick}>품질 이상 항목 세부보기</DetailButton>
                    )}
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
