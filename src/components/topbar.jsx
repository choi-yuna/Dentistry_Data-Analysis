import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/images/fas-logo.svg';
import fileUploadIcon from '../assets/images/file-upload.svg';
import userIcon from '../assets/images/user.svg';
import logoutIcon from '../assets/images/logout.svg';
import { uploadZipFile } from '../api/fileUploadApi'; // API 호출 함수 임포트
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
    const [file, setFile] = useState(null);
    const { setFileId } = useFileContext();

    // 파일이 변경될 때 호출되는 핸들러
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            handleUpload(selectedFile); // 파일 선택 후 즉시 업로드
        }
    };

    // 파일 업로드 처리 함수
    const handleUpload = async (file) => {
        try {
            const fileId = await uploadZipFile(file); // 파일 업로드 API 호출
            console.log('Uploaded file with ID:', fileId);
            setFileId(fileId);
            alert(`File uploaded successfully! File ID: ${fileId}`);
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

                {/* 숨겨진 파일 입력 필드 */}
                <HiddenFileInput
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                <Icon src={userIcon} alt="User" />
                <Username>000님</Username>
                <Icon src={logoutIcon} alt="Logout" />
            </TopBarRight>
        </TopBarContainer>
    );
};

export default TopBar;
