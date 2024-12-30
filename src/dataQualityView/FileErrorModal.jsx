import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { DataContext } from '../context/DataContext';
import { fetchFileErrorData } from '../api/fileErrorApi';

const FloatingWindow = styled.div`
    position: fixed;
    top: 30%;
    left: 35%;
    transform: translate(-50%, -50%);
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 50%;
    max-width: 600px;
    max-height: 70vh;
    z-index: 1000;
    padding: 20px;
    overflow-y: auto;
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

const InlineContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const Select = styled.select`
    width: 45%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const AnalyzeButton = styled.button`
    padding: 10px 15px;
    background-color: #2176A8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
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

    const [institutions, setInstitutions] = useState([
        { id: "1", name: "원광대" },
        { id: "2", name: "고려대" },
        { id: "3", name: "서울대" },
        { id: "4", name: "국립암센터" },
        { id: "5", name: "단국대" },
        { id: "6", name: "조선대" },
        { id: "7", name: "보라매병원" },
    ]);

    const [diseases, setDiseases] = useState([
        { id: "A", name: "치주질환" },
        { id: "B", name: "골수염 (질환군)" },
        { id: "E", name: "골수염 (대조군)" },
        { id: "C", name: "구강암" },
        { id: "D", name: "두개안면" },
    ]);

    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [selectedDisease, setSelectedDisease] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAnalyze = () => {
        if (!selectedInstitution || !selectedDisease) {
            setError('기관과 질환을 선택해주세요.');
            return;
        }

        setLoading(true);
        fetchFileErrorData(selectedInstitution, selectedDisease)
            .then((data) => {
                if (data && Object.keys(data).length > 0) {
                    setFileErrorData(data);
                    setError(null);
                } else {
                    setError('서버에서 유효한 데이터를 반환하지 않았습니다.');
                }
            })
            .catch((error) => {
                console.error('Failed to fetch file error data:', error);
                setError(`파일 오류 데이터를 불러오는 중 문제가 발생했습니다: ${error.message}`);
            })
            .finally(() => setLoading(false));
    };

    const handleDetailsClick = (fileType) => {
        setSelectedFileType(fileType);
    };

    const handleCloseDetailsWindow = () => {
        setSelectedFileType(null);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* 메인 모달 */}
            <Draggable>
                <FloatingWindow>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                    <h2>오류 파일 탐색 결과</h2>

                    <InlineContainer>
                        <Select
                            value={selectedInstitution}
                            onChange={(e) => setSelectedInstitution(e.target.value)}
                        >
                            <option value="">기관 선택</option>
                            {institutions.map((institution) => (
                                <option key={institution.id} value={institution.id}>
                                    {institution.name}
                                </option>
                            ))}
                        </Select>

                        <Select
                            value={selectedDisease}
                            onChange={(e) => setSelectedDisease(e.target.value)}
                        >
                            <option value="">질환 선택</option>
                            {diseases.map((disease) => (
                                <option key={disease.id} value={disease.id}>
                                    {disease.name}
                                </option>
                            ))}
                        </Select>

                        <AnalyzeButton onClick={handleAnalyze} disabled={loading}>
                            {loading ? '데이터를 불러오는 중...' : '분석'}
                        </AnalyzeButton>
                    </InlineContainer>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    {fileErrorData && (
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
                    )}
                </FloatingWindow>
            </Draggable>

            {/* 상세보기 모달 */}
            {selectedFileType && (
                <Draggable>
                    <FloatingWindow>
                        <CloseButton onClick={handleCloseDetailsWindow}>&times;</CloseButton>
                        <h2>{selectedFileType} 상세 목록</h2>
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
    );
};

export default FileErrorModal;
