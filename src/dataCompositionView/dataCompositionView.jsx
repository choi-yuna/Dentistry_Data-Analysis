import React, { useState } from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TopSection from './TopSection';
import { useDiseaseData } from '../context/DiseaseDataContext';

const DataCompositionView = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('질환별 보기');

  const { data, loading, error, refreshData  } = useDiseaseData(); 

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
              <Refresh onClick={handleRefreshClick} >전체 새로고침</Refresh>
            </TitleCtn>
          <TopSectionCtn>
            <TopSection activeTab={activeTab} setActiveTab={setActiveTab} />
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
  height: 40px;
  width: 110px;
  align-items: center;
  justify-content: center;
  color: black;
  background-color: #d5d4f7;
  margin-left: 8%;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 900;
  border: 1px solid #a8a9c2;
  &:hover{
    background-color: #9696bb;
  }
`;
