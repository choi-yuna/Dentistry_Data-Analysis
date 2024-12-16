import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { headerMapping, diseaseHeaderMapping, diseaseNameMapping } from '../utils/headerMapping';

const Modal = ({ isOpen, onClose, excelData = [], invalidItems = [] }) => {
    const [selectedDisease, setSelectedDisease] = useState('');
    const [diseaseOptions, setDiseaseOptions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (isOpen && excelData.length > 0) {
            console.log('Original Excel Data:', excelData);
    
            const filteredExcelData = excelData.filter(
                (item) => Array.isArray(item) && typeof item[0] === 'object' && typeof item[1] === 'object'
            );
    
            const transformedData = filteredExcelData.map(([optional, required]) => ({
                optional,
                required,
            }));
    
            console.log('Transformed Data:', transformedData);
    
            // 질병 선택 옵션 설정 (중복 제거)
            const options = [...new Set(
                transformedData
                    .map((data) => data.required?.DISEASE_CLASS)
                    .filter((item) => item) // 값이 존재하는 항목만
            )];
    
            console.log('Unique Disease Options:', options);
    
            if (options.length > 0 && JSON.stringify(diseaseOptions) !== JSON.stringify(options)) {
                setDiseaseOptions(options); // 중복 제거된 옵션 설정
                if (!selectedDisease) setSelectedDisease(options[0]); // 초기값 설정
                setFilteredData(transformedData); // 변환된 데이터 설정
            }
        }
    }, [isOpen, excelData]); // 의존성 최소화
    
    // 선택된 질병 변경 시 데이터 필터링
    useEffect(() => {
        if (selectedDisease) {
            const filtered = filteredData.filter(
                (data) => data?.required?.DISEASE_CLASS === selectedDisease
            );
            setFilteredData(filtered);
        }
    }, [selectedDisease]); // `filteredData`를 의존성에서 제거

    const headers = diseaseHeaderMapping[selectedDisease] || [];

    const renderCell = (value, isRequired, isInvalid) => {
        const isNull = value === null || value === '';
        return (
            <ExcelCell
                isNull={isNull}
                isInvalid={isInvalid}
                isRequired={isRequired}
            >
                {isNull ? 'N/A' : value}
            </ExcelCell>
        );
    };

    const isInvalidCell = (rowIndex, column, isRequired) => {
        return invalidItems.some(
            (item) =>
                item.row === rowIndex &&
                item.column === column &&
                item.isRequired === isRequired
        );
    };

    if (!isOpen) return null;

    if (diseaseOptions.length === 0) {
        return (
            <ModalOverlay onClick={onClose}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <ModalHeader>
                        <ModalTitle>품질 이상 항목 세부내용</ModalTitle>
                        <CloseButton onClick={onClose}>&times;</CloseButton>
                    </ModalHeader>
                    <div>데이터가 없습니다.</div>
                </ModalContent>
            </ModalOverlay>
        );
    }

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>품질 이상 항목 세부내용</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <SelectContainer>
                    <Label>질병 선택:</Label>
                    <Select
                        value={selectedDisease}
                        onChange={(e) => setSelectedDisease(e.target.value)}
                    >
                        {diseaseOptions.length > 0 ? (
                            diseaseOptions.map((disease, index) => (
                                <option key={index} value={disease}>
                                    {diseaseNameMapping[disease] || disease}
                                </option>
                            ))
                        ) : (
                            <option value="">선택할 수 있는 질병이 없습니다</option>
                        )}
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
                            {filteredData.map((data, rowIndex) => {
                                const required = data?.required || {};
                                const optional = data?.optional || {};

                                return (
                                    <ExcelRow key={rowIndex}>
                                        {headers.map((header) => {
                                            const isRequired = header in required;
                                            const value = isRequired
                                                ? required[header]
                                                : optional[header] || ''; // 기본값 설정
                                            return renderCell(
                                                value,
                                                isRequired,
                                                false
                                            );
                                        })}
                                    </ExcelRow>
                                );
                            })}
                        </tbody>
                    </ExcelTable>
                </TableContainer>
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;

// 스타일 컴포넌트는 기존 코드 유지



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
    background-color: ${({ isRequired, isNull, isInvalid }) =>
        isInvalid
            ? 'red'
            : isNull
            ? isRequired
                ? 'yellow' // 필수값 누락
                : 'lightyellow' // 선택값 누락
            : 'white'};
    color: ${({ isRequired, isInvalid }) =>
        isInvalid
            ? 'white' // 수정 필요한 값
            : isRequired
            ? 'blue' // 필수값 텍스트 색
            : 'black'}; // 선택값 텍스트 색
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