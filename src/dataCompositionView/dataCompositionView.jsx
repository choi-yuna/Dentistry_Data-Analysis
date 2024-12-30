import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TopSection from './TopSection';
import errorList from '../assets/images/errorLIst.svg';
import { useDiseaseData } from '../context/DiseaseDataContext';
import FileErrorModal from '../dataQualityView/FileErrorModal'; 

const DataCompositionView = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('질환별 보기');
  const [isFileErrorModalOpen, setFileErrorModalOpen] = useState(false); // 추가

  const { data, loading, error, refreshData } = useDiseaseData();

  const handleRefreshClick = () => {
    console.log('[DEBUG] 전체 새로고침 버튼 클릭');
    refreshData();
  };

  const handleErrorModalOpen = () => {
    setFileErrorModalOpen(true);
  };

  const handleErrorModalClose = () => {
    setFileErrorModalOpen(false);
  };

  return (
    <AppContainer>
      <TopBar />
      <MainContent>
        <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <ContentCtn collapsed={collapsed}>
          <TitleCtn>
            <Title>데이터 구축 현황</Title>
            <ButtonGroup>
              <ErrorModalButton onClick={handleErrorModalOpen}>
                오류 파일 탐색
              </ErrorModalButton>
              {!loading && (
                <Refresh onClick={handleRefreshClick}>전체 새로고침</Refresh>
              )}
            </ButtonGroup>
          </TitleCtn>
          <TopSectionCtn>
            {loading ? (
              <LoadingContainer>
                <Spinner>
                  <OuterCircle />
                  <InnerCircle />
                </Spinner>
                <LoadingText>데이터를 분석 중입니다...</LoadingText>
              </LoadingContainer>
            ) : (
              <TopSection activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
            <ErrorInfoCtn>
              <ErrorIcon src={errorList} alt="에러 이모티콘" />
              <span>- 오류 상세보기</span>
            </ErrorInfoCtn>
          </TopSectionCtn>
        </ContentCtn>
      </MainContent>
      <FileErrorModal
        isOpen={isFileErrorModalOpen}
        onClose={handleErrorModalClose}
      />
    </AppContainer>
  );
};

export default DataCompositionView;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: #f7f7f7;
  transition: width 0.3s ease, height 0.3s ease;
  position: relative;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const ContentCtn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5px;
  margin-left: ${(props) => (props.collapsed ? '5%' : '20%')};
  height: calc(100vh - 80px);
`;

const TitleCtn = styled.div`
  display: flex;
  height: 60px;
  margin-top: 3%;
  align-items: center;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 버튼 간 간격 */
  margin-top: 2%;
`;

const ErrorModalButton = styled.button`
  display: flex;
  height: 25px;
  width: 120px;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background-color: #f76d6d;
  border: none;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(255, 105, 105, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d55b5b;
    box-shadow: 0 6px 8px rgba(255, 105, 105, 0.5);
    transform: translateY(-2px);
  }

  &:active {
    background-color: #b74a4a;
    box-shadow: 0 3px 5px rgba(255, 105, 105, 0.3);
    transform: translateY(0);
  }
`;

const Refresh = styled.button`
  display: flex;
  height: 25px;
  width: 100px;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background-color: #407bba;
  border: none;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 6px 8px rgba(0, 123, 255, 0.5);
    transform: translateY(-2px);
  }

  &:active {
    background-color: #064486;
    box-shadow: 0 3px 5px rgba(0, 123, 255, 0.3);
    transform: translateY(0);
  }
`;

const TopSectionCtn = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
`;

const Title = styled.div`
  text-align: center;
  color: black;
  font-size: 20px;
  font-weight: 800;
  width: 200px;
  margin-top: 2%;
`;

const spinOuter = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinInner = keyframes`
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
`;

const Spinner = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const OuterCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top: 4px solid #6a5acd;
  border-radius: 50%;
  animation: ${spinOuter} 1.5s linear infinite;
`;

const InnerCircle = styled.div`
  position: absolute;
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  border: 4px solid transparent;
  border-top: 4px solid #291f7c;
  border-radius: 50%;
  animation: ${spinInner} 1s linear infinite;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border-radius: 10px;
  height: 100%;
  width: 100%;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #000000;
`;

const ErrorInfoCtn = styled.div`
  position: absolute;
  bottom: 60px;
  right: 2%;
  background-color: #f7f7f7;
  padding: 10px;
  font-size: 11px;
  font-weight: bold;
  color: #575757;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
`;

const ErrorIcon = styled.img`
  width: 16px;
  height: 14px;
  object-fit: contain;
`;