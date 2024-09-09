import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/images/fas-logo.svg';
import fileUploadIcon from '../assets/images/file-upload.svg';
import userIcon from '../assets/images/user.svg';
import logoutIcon from '../assets/images/logout.svg';
import { uploadExcelFiles } from '../api/fileUploadApi'; // API 호출 함수 임포트
import { useFileContext } from '../FileContext';

const TopBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0C476A;
    padding: 0px 10px;
    color: white;
    box-sizing: border-box;
    z-index:1000;
`;

const TopBarLeft = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
`;

const Logo = styled.img`
    height: 42px;
    margin-right: 5px;
    left: 35px;
`;

const TopBarRight = styled.div`
    display: inline-flex;
    align-items: center;
    padding-top: 18px;
    padding-bottom: 2px;
    gap: 12%;
    margin-right: 4%;
    margin-bottom: 4px;
`;

const Icon = styled.img`
    height: 30px;
    cursor: pointer;
`;

const Username = styled.span`
    margin-right: 2%;
    margin-top: 13px;
    white-space: nowrap;
    font-size: 15px;
    font-family: 'Inter';
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const TopBar = () => {
    const [files, setFiles] = useState([]);
    const { setFileId } = useFileContext();

    // 폴더 내 파일들이 변경될 때 호출되는 핸들러
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const excelFiles = selectedFiles.filter((file) => file.name.endsWith('.xlsx')); // 엑셀 파일만 필터링
        if (excelFiles.length > 0) {
            setFiles(excelFiles); // 엑셀 파일만 상태에 저장
            handleUpload(excelFiles); // 엑셀 파일만 업로드
        } else {
            alert('선택한 폴더에 엑셀 파일이 없습니다.');
        }
    };

    // 파일 업로드 처리 함수
    const handleUpload = async (files) => {
        try {
            // 여러 파일을 한번에 업로드
            const fileIds = await uploadExcelFiles(files); // 다중 파일 업로드 API 호출
            console.log('Uploaded file IDs:', fileIds);
            setFileId(fileIds); // 업로드된 파일 ID 배열 저장
            alert('All Excel files uploaded successfully!');
        } catch (error) {
            console.error('File upload failed:', error);
            alert('File upload failed. Please try again.');
        }
    };

    // 파일 선택 트리거를 위한 참조 생성
    const fileInputRef = React.createRef();

    // 파일 업로드 아이콘 클릭 핸들러 (파일 선택 창 열기)
    const handleIconClick = () => {
        fileInputRef.current.click(); // 숨겨진 파일 입력 필드를 클릭
    };

    return (
        <TopBarContainer>
            <TopBarLeft>
                <Logo src={logo} alt="Logo" />
            </TopBarLeft>
            <TopBarRight>
                {/* 파일 업로드 아이콘 클릭 시 파일 선택 창 열기 */}
                <Icon src={fileUploadIcon} alt="Upload" onClick={handleIconClick} />

                {/* 숨겨진 폴더 입력 필드 */}
                <HiddenFileInput
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    webkitdirectory="true" // 폴더 선택을 가능하게 함
                    multiple // 다중 파일 선택을 가능하게 함
                />

                <Icon src={userIcon} alt="User" />
                <Username>000님</Username>
                <Icon src={logoutIcon} alt="Logout" />
            </TopBarRight>
        </TopBarContainer>
    );
};

export default TopBar;
