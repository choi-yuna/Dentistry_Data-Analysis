import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { DataContext } from '../context/DataContext';
import { fetchFileErrorData } from '../api/fileErrorApi';

const FloatingWindow = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
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

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
`;

const FileErrorModal = ({ isOpen, onClose }) => {
    const { institution, disease } = useContext(DataContext);
    const [fileErrorData, setFileErrorData] = useState(null);
    const [selectedFileType, setSelectedFileType] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && institution && disease) {
            fetchFileErrorData(institution, disease)
                .then((data) => {
                    setFileErrorData(data);
                    setError(null); // 오류 초기화
                })
                .catch((error) => {
                    console.error('Failed to fetch file error data:', error);
                    setError('파일 오류 데이터를 불러오지 못했습니다.');
                });
        }
    }, [isOpen, institution, disease]);

    const handleDetailsClick = (fileType) => {
        setSelectedFileType(fileType);
    };

    const handleCloseDetailsWindow = () => {
        setSelectedFileType(null);
    };

    if (!isOpen) return null;

    return (
        <Draggable>
            <FloatingWindow>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h2>오류 파일 탐색 결과</h2>
                {error ? (
                    <ErrorMessage>{error}</ErrorMessage>
                ) : (
                    <>
                        {fileErrorData ? (
                            <>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>파일 유형</th>
                                            <th>중복 파일 개수</th>
                                            <th>상세보기</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(fileErrorData).map((fileType) => (
                                            <tr key={fileType}>
                                                <td>{fileType}</td>
                                                <td>{fileErrorData[fileType].length}</td>
                                                <td>
                                                    <DetailsButton onClick={() => handleDetailsClick(fileType)}>
                                                        상세보기
                                                    </DetailsButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

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
                                                    {fileErrorData[selectedFileType].map((fileName, index) => (
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
                        ) : (
                            <p>데이터를 불러오는 중입니다...</p>
                        )}
                    </>
                )}
            </FloatingWindow>
        </Draggable>
    );
};

export default FileErrorModal;
