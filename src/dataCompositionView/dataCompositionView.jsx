import React, { useState } from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TopSection from './TopSection';
import { useDiseaseData } from '../context/DiseaseDataContext';

const DataCompositionView = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('질환별 보기');

  const { data, loading, error } = useDiseaseData(); 

  // 디버깅 로그 추가
  console.log('[DEBUG] DataCompositionView: DiseaseDataContext Data:', data);
  console.log('[DEBUG] DataCompositionView: Loading State:', loading);
  console.log('[DEBUG] DataCompositionView: Error State:', error);

  // Context에서 받은 데이터를 활용하여 렌더링
  const fileStatuses = data && data.data ? data.data.대시보드?.statuses : []; 

  console.log('[DEBUG] DataCompositionView: Parsed FileStatuses:', fileStatuses);

  return (
    <AppContainer>
      <TopBar />
      <MainContent>
        <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <ContentCtn collapsed={collapsed}>
            <TitleCtn>
              <Title>데이터 구축 현황</Title>
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
  width: 300px;
  margin-top: 3%;
  align-items: center;
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
`;
