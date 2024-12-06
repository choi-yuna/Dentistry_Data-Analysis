import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TopSection from './TopSection';
import { useDiseaseData } from '../context/DiseaseDataContext';

const DataCompositionView = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('질환별 보기');

  const { data, loading, error, refreshData } = useDiseaseData();

  // 디버깅 로그 추가
  console.log('[DEBUG] DataCompositionView: DiseaseDataContext Data:', data);
  console.log('[DEBUG] DataCompositionView: Loading State:', loading);
  console.log('[DEBUG] DataCompositionView: Error State:', error);

  // Context에서 받은 데이터를 활용하여 렌더링
  const fileStatuses = data && data.data ? data.data.대시보드?.statuses : [];

  console.log('[DEBUG] DataCompositionView: Parsed FileStatuses:', fileStatuses);

  // 새로고침 버튼 클릭 핸들러
  const handleRefreshClick = () => {
    console.log('[DEBUG] 전체 새로고침 버튼 클릭');
    refreshData(); // refreshData 호출
  };

  return (
    <AppContainer>
      <TopBar />
      <MainContent>
        <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <ContentCtn collapsed={collapsed}>
          <TitleCtn>
            <Title>데이터 구축 현황</Title>
            {!loading && (
              <Refresh onClick={handleRefreshClick}>전체 새로고침</Refresh>
            )}
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
          </TopSectionCtn>
        </ContentCtn>
      </MainContent>
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
  padding: 20px;
  margin-top: 30px;
  margin-left: ${(props) => (props.collapsed ? '5%' : '20%')};
  height: calc(100vh - 80px);
`;

const TitleCtn = styled.div`
  display: flex;
  height: 60px;
  margin-top: 3%;
  align-items: center;
  gap: 63%;
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
`;

const Refresh = styled.button`
  display: flex;
  height: 25px;
  width: 100px;
  align-items: center;
  justify-content: center;
  color: #ffffff; 
  background-color: #407bba; 
  margin-left: 14%;
  margin-top: 1%;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  border: none; 
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.3);
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
