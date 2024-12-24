import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const FloatingWindow = styled.div`
    position: fixed;
    top: 25%;
    left: 35%;
    transform: translate(-50%, -50%);
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 50%;
    max-width: 600px;
    z-index: 1000;
    padding: 20px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f4f4f4;
    }
`;

const DetailsButton = styled.button`
    padding: 5px 10px;
    background-color: #2176A8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const FileErrorModal = ({ isOpen, onClose, fileErrorData }) => {
    const [selectedFileType, setSelectedFileType] = useState(null);

    const handleDetailsClick = (fileType) => {
        setSelectedFileType(fileType);
    };

    const handleCloseDetailsWindow = () => {
        setSelectedFileType(null);
    };

    const dummyData = {
        CRF: ['file1.crf', 'file2.crf'],
        Json: ['file1.json', 'file2.json', 'file3.json'],
        "json파일": ['file1.jsonFile', 'file2.jsonFile']
    };

    const dataToDisplay = dummyData;

    return (
        <>
            {isOpen && (
                <Draggable>
                    <FloatingWindow>
                        <CloseButton onClick={onClose}>&times;</CloseButton>
                        <h2>오류 파일 탐색 결과</h2>
                        <Table>
                            <thead>
                                <tr>
                                    <th>파일 유형</th>
                                    <th>중복 파일 개수</th>
                                    <th>상세보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(dataToDisplay).map((fileType) => (
                                    <tr key={fileType}>
                                        <td>{fileType}</td>
                                        <td>{dataToDisplay[fileType].length}</td>
                                        <td>
                                            <DetailsButton onClick={() => handleDetailsClick(fileType)}>
                                                상세보기
                                            </DetailsButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </FloatingWindow>
                </Draggable>
            )}

            {selectedFileType && (
                <Draggable>
                    <FloatingWindow>
                        <CloseButton onClick={handleCloseDetailsWindow}>&times;</CloseButton>
                        <h2>{selectedFileType} 파일 상세 목록</h2>
                        <Table>
                            <thead>
                                <tr>
                                    <th>파일 이름</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataToDisplay[selectedFileType].map((fileName, index) => (
                                    <tr key={index}>
                                        <td>{fileName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </FloatingWindow>
                </Draggable>
            )}
        </>
    );
};

export default FileErrorModal;
