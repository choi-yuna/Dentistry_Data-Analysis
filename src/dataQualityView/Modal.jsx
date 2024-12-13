import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { headerMapping, diseaseHeaderMapping, diseaseNameMapping } from '../utils/headerMapping';  // 헤더 매핑 가져오기

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
    background-color: ${({ isNull, isInvalid }) => (isNull ? 'yellow' : isInvalid ? 'red' : 'white')};
    color: black;
    font-weight: ${({ isInvalid }) => (isInvalid ? 'bold' : 'normal')};
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
    justify-content: space-between; /* 선택박스와 설명이 나란히 위치하도록 정렬 */
`;

const ColorBox = styled.span`
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: ${({ color }) => color};
    margin-right: 5px;
    border: 1px solid #ccc;
`;

const Explanation = styled.div`
    font-size: 14px;
    color: #555;
    margin-left: 10px; /* 셀렉트 박스와 설명 사이의 간격 */
    white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
    display: flex;
    align-items: center;
`;

const Modal = ({ isOpen, onClose, excelData, invalidItems = [] }) => {  // invalidItems 추가
    const [selectedDisease, setSelectedDisease] = useState('');
    const [diseaseOptions, setDiseaseOptions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const options = [...new Set(excelData.slice(1).map(row => row[0]))].filter(option => ['A', 'B', 'C', 'D','E'].includes(option));
            setDiseaseOptions(options);
            setSelectedDisease(options[0] || '');
        }
    }, [isOpen, excelData]);

    useEffect(() => {
        if (selectedDisease) {
            const dataWithOriginalIndices = excelData.slice(1).map((row, index) => ({ row, originalIndex: index + 1 }));
            const filtered = dataWithOriginalIndices.filter(rowObj => rowObj.row[0] === selectedDisease);
            setFilteredData(filtered);
        }
    }, [selectedDisease, excelData]);

    if (!isOpen) return null;

    const headers = selectedDisease ? diseaseHeaderMapping[selectedDisease] : excelData[0];

    // 유효성 검사에서 실패한 항목을 확인하는 함수
    const isInvalidCell = (originalRowIndex, column) => {
        return invalidItems.some(item => item.row === originalRowIndex && item.column === column);  // 실패한 항목인지 확인
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>품질 이상 항목 세부내용</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <SelectContainer>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Label>질병 선택:</Label>
                        <Select value={selectedDisease} onChange={e => setSelectedDisease(e.target.value)}>
                            {diseaseOptions.map((disease, index) => (
                                <option key={index} value={disease}>
                                    {diseaseNameMapping[disease]}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* 설명 텍스트 추가 */}
                    <Explanation>
                        <ColorBox color="yellow" /> 누락된 값
                        <ColorBox color="red" style={{ marginLeft: '15px' }} /> 수정이 필요한 항목
                    </Explanation>
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
                            {filteredData.map(({ row, originalIndex }, rowIndex) => (
                                <ExcelRow key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <ExcelCell
                                            key={cellIndex}
                                            isNull={cell === null || cell === ''}
                                            isInvalid={isInvalidCell(originalIndex, headers[cellIndex])}  // 원래의 인덱스로 검사
                                        >
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
