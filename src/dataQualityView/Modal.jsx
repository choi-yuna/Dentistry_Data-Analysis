import React from 'react';
import styled from 'styled-components';

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
    z-index:900;
`;

const ModalContent = styled.div`
    background: white;
    padding: 0;
    border-radius: 8px;
    width: 60%;
    height: 40%;
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
    font-size: 22px;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
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
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
    background-color: #f2f2f2;
    font-weight: bold;
`;

const ExcelCell = styled.td`
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
`;

const Modal = ({ isOpen, onClose, excelData }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>품질 이상 항목 세부내용</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                <TableContainer>
                    <ExcelTable>
                        <thead>
                            <ExcelHeaderRow>
                                {excelData[0] && excelData[0].map((cell, index) => (
                                    <ExcelHeaderCell key={index}>{cell}</ExcelHeaderCell>
                                ))}
                            </ExcelHeaderRow>
                        </thead>
                        <tbody>
                            {excelData.slice(1).map((row, rowIndex) => (
                                <ExcelRow key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <ExcelCell key={cellIndex}>{cell}</ExcelCell>
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
