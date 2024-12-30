import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { headerMapping, diseaseHeaderMapping, diseaseNameMapping,jsonHeaderMapping  } from '../utils/headerMapping';



const Modal = ({ isOpen, onClose, excelData = [], invalidItems = [],isJsonData = false }) => {
    const [selectedDisease, setSelectedDisease] = useState('');
    const [diseaseOptions, setDiseaseOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // 헤더를 JSON 여부에 따라 설정
    const headers = useMemo(() => {
        return isJsonData
            ? jsonHeaderMapping[selectedDisease] || [] // JSON 데이터의 헤더
            : diseaseHeaderMapping[selectedDisease] || []; // 일반 데이터의 헤더
    }, [selectedDisease, isJsonData]);


    
    // 필터링된 데이터 메모이제이션
    const filteredData = useMemo(() => {
        if (!selectedDisease || excelData.length === 0) return [];
        return excelData
            .filter((item) => Array.isArray(item) && typeof item[0] === 'object' && typeof item[1] === 'object')
            .map(([optional, required], index) => ({ optional, required, originalIndex: index }))
            .filter((data) => data.required?.disease === selectedDisease);
    }, [excelData, selectedDisease]);
    

    // 초기 질병 옵션 설정
    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            const options = [...new Set(
                excelData
                    .filter((item) => Array.isArray(item) && typeof item[0] === 'object' && typeof item[1] === 'object')
                    .map(([, required]) => required?.disease)
                    .filter(Boolean)
            )];
            setDiseaseOptions(options);
            if (!selectedDisease && options.length > 0) setSelectedDisease(options[0]);
            setIsLoading(false);
        }
    }, [isOpen, excelData]);


    const isInvalidCell = (rowIndex, columnKey) => {
        const originalIndex = filteredData[rowIndex]?.originalIndex; // 원본 인덱스 가져오기
        return invalidItems.some(
            (item) => item.row - 1 === originalIndex && item.column === columnKey
        );
    };
    
    
    const renderCell = (value, isRequired, rowIndex, header) => {
        const isNull = value === null || value.trim() === ''|| value === 'none';
        const isInvalid = isInvalidCell(rowIndex, header); // 유효성 검사 실패
        const isOptionalInvalid = !isRequired && isInvalid; // 선택 항목에서만 유효성 검사 실패
    
        return (
            <ExcelCell
                isNull={isNull}
                isInvalid={isRequired && isInvalid} // 필수 항목에 대한 invalid 처리
                isOptionalInvalid={isOptionalInvalid} // 선택 항목 invalid 처리
                isRequired={isRequired}
            >
                {isNull ? 'N/A' : value}
            </ExcelCell>
        );
    };
    


    const isOptionalHeader = (header) => {
        const sampleOptional = filteredData[0]?.optional || {}; // 첫 번째 데이터의 optional 구조 사용
        return header in sampleOptional; // header가 optional에 존재하면 true
    };

    if (!isOpen) return null;

    if (isLoading) {
        return (
            <ModalOverlay onClick={onClose}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <ModalHeader>
                        <ModalTitle>품질 이상 항목 세부내용</ModalTitle>
                        <CloseButton onClick={onClose}>&times;</CloseButton>
                    </ModalHeader>
                    <LoadingContainer>로딩 중...</LoadingContainer>
                </ModalContent>
            </ModalOverlay>
        );
    }

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
       const getColumnStats = (header) => {
            let totalCount = 0;
                let errorCount = 0;
        
                filteredData.forEach((data, rowIndex) => {
                    const required = data?.required || {};
                const optional = data?.optional || {};
        
                    const isRequired = header in required;
                    const value = isRequired ? required[header] : optional[header];
                    const isInvalid = isInvalidCell(rowIndex, header, isRequired);
        
                    totalCount += 1; // 모든 셀 카운트
                    if (value === null || value === '' || value === 'none' || isInvalid) {
                        errorCount += 1; // 오류 카운트 (값 누락 또는 유효하지 않은 경우)
                }
                });
        
                return { totalCount, errorCount };
            };
         
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
                        {diseaseOptions.map((disease, index) => (
                            <option key={index} value={disease}>
                                {diseaseNameMapping[disease] || disease}
                            </option>
                        ))}
                    </Select>
                </SelectContainer>
                <Explanation>
                    <ColorBox color="red" /> 필수 항목 누락 / 이상
                    <ColorBox color="yellow" style={{ marginLeft: '15px' }} /> 선택 항목 누락 / 이상
                </Explanation>
                <TableContainer>
                    <ExcelTable>
                        <thead>
                            <ExcelHeaderRow>
                            {headers.map((header, index) => {
                                    const { totalCount, errorCount } = getColumnStats(header);

                                   return (
                                        <ExcelHeaderCell
                                            key={index}
                                            isOptional={isOptionalHeader(header)}
                                         >
                                            <div
                                                style={{
                                                    color: isOptionalHeader(header) ? 'black' : 'blue',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                }}
                                           >
                                                {headerMapping[header] || header}
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: '11px',
                                                    marginTop: '5px',
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    alignItems: 'flex-end', 
                                                    textAlign: 'center', 
                                                    height: '100%', 
                                                    color: 'gray',
                                                }}
                                            >
                                                전체: {totalCount} / 오류: {errorCount}
                                            </div>
                                        </ExcelHeaderCell>
                                    );
                                })}
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
                const value = isRequired ? required[header] : optional[header] || '';
                return renderCell(value, isRequired, rowIndex, header); // rowIndex와 header 전달
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

// 스타일 컴포넌트 추가
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
    background-color: ${({ isRequired, isNull, isInvalid, isOptionalInvalid }) =>
        isInvalid
            ? 'red' // 필수값 유효성 실패 → 빨간색
            : isOptionalInvalid
            ? 'yellow' // 선택값 유효성 실패 → 노란색
            : isNull
            ? isRequired
                ? 'red' // 필수값 누락 → 빨간색
                : 'yellow' // 선택값 누락 → 노란색
            : 'white'}; // 기본값
    color: ${({ isInvalid, isOptionalInvalid }) =>
        isInvalid || isOptionalInvalid ? 'white' : 'black'}; // 텍스트 색상
    font-weight: ${({ isInvalid, isOptionalInvalid }) =>
        isInvalid || isOptionalInvalid ? 'bold' : 'normal'};
`;


const Label = styled.label`
    font-size: 14px;
    margin-right: 8px;
`;

const Select = styled.select`
    margin: 5px;
    padding: 3px 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    outline: none;
    width: auto;

    &:focus {
        border-color: #0C476A;
    }
`;

const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 3px 10px;
    background-color: #ffffff;
    border-bottom: 1px solid #ddd;
    justify-content: start;
`;

const Explanation = styled.div`
    font-size: 14px;
    color: #555;
    margin-left: 10px;
    white-space: nowrap;
    display: flex;
    align-items: center;
`;

const ColorBox = styled.span`
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: ${({ color }) => color};
    margin-right: 5px;
    border: 1px solid #ccc;
`;

const LoadingContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #555;
    z-index: 900;
`;