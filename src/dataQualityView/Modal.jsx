import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import  { headerMapping, diseaseHeaderMapping, diseaseNameMapping } from '../utils/headerMapping';  // 헤더 매핑 가져오기

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 900;
`;

const ModalContent = styled.div`
    background: white;
    padding: 0;
    border-radius: 8px;
    width: 90%;
    height: 75%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const ModalHeader = styled.div`
    padding: 10px;
    background-color: #0C476A;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ModalTitle = styled.h3`
    margin: 0;
    font-size: 20px;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 22px;
    color: white;
    cursor: pointer;
`;

const TableContainer = styled.div`
    flex: 1;
    overflow: auto;
    white-space: nowrap;
`;

const ExcelTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const ExcelHeaderRow = styled.tr`
    background-color: #f2f2f2;
    position: sticky;
    top: 0;
    z-index: 1;
`;

const ExcelRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

const ExcelHeaderCell = styled.th`
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
    background-color: #f2f2f2;
    font-weight: bold;
`;

const ExcelCell = styled.td`
    padding: 4px;
    border: 1px solid #ddd;
    text-align: left;
    background-color: ${({ isNull }) => (isNull ? 'yellow' : 'white')};
`;

const Label = styled.label`
    font-size: 14px;
    margin-right: 8px;
`;

const Select = styled.select`
    margin: 5px;
    padding: 3px 8px;  /* 패딩을 줄여서 셀렉트 박스 크기 감소 */
    font-size: 14px;  /* 폰트 크기 조정 */
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    outline: none;
    width: auto;  /* 고정된 너비 제거 */
    
    &:focus {
        border-color: #0C476A; /* 포커스 시 테두리 색상 */
    }
`;

const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 3px 10px;
    background-color: #ffffff;
    border-bottom: 1px solid #ddd;
`;


const Modal = ({ isOpen, onClose, excelData }) => {
    const [selectedDisease, setSelectedDisease] = useState('');
    const [diseaseOptions, setDiseaseOptions] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const options = [...new Set(excelData.slice(1).map(row => row[0]))].filter(option => ['A', 'B', 'C', 'D'].includes(option));
            setDiseaseOptions(options);
            setSelectedDisease(options[0] || '');
        }
    }, [isOpen, excelData]);

    if (!isOpen) return null;

    const filteredData = selectedDisease
        ? excelData.filter(row => row[0] === selectedDisease)
        : excelData.slice(1);

    const headers = selectedDisease ? diseaseHeaderMapping[selectedDisease] : excelData[0];

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>품질 이상 항목 세부내용</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <SelectContainer>
                    <Label>질병 선택:</Label>
                    <Select value={selectedDisease} onChange={e => setSelectedDisease(e.target.value)}>
                        {diseaseOptions.map((disease, index) => (
                            <option key={index} value={disease}>
                                {diseaseNameMapping[disease]}
                            </option>
                        ))}
                    </Select>
                </SelectContainer>

                <TableContainer>
                    <ExcelTable>
                        <thead>
                            <ExcelHeaderRow>
                                {headers.map((header, index) => (
                                    <ExcelHeaderCell key={index}>
                                        {headerMapping[header] || header}
                                    </ExcelHeaderCell>
                                ))}
                            </ExcelHeaderRow>
                        </thead>
                        <tbody>
                            {filteredData.map((row, rowIndex) => (
                                <ExcelRow key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <ExcelCell key={cellIndex} isNull={cell === null || cell === ''}>
                                            {cell !== null && cell !== '' ? cell : 'N/A'}
                                        </ExcelCell>
                                    ))}
                                </ExcelRow>
                            ))}
                        </tbody>
                    </ExcelTable>
                </TableContainer>
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;