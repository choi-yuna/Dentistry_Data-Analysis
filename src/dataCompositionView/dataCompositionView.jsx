import React, { useState } from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TotalFileStatus from '../components/TotalFileStatus';
import TopSection from './TopSection';
import { useDiseaseData } from '../context/DiseaseDataContext'; // Context 가져오기

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
          <TopCtn>
            <TitleCtn>
              <Title>데이터 구축 현황</Title>
            </TitleCtn>
            <TotalFileCtn>
              {loading && <LoadingMessage>Loading...</LoadingMessage>}
              {error && <ErrorMessage>Error: {error}</ErrorMessage>}
              {!loading && !error && fileStatuses.map((status, index) => {
                console.log('[DEBUG] Rendering TotalFileStatus:', status); // 각 상태 로그
                return <TotalFileStatus key={index} {...status} />;
              })}
            </TotalFileCtn>
          </TopCtn>
          <TopSectionCtn>
            <TopSection activeTab={activeTab} setActiveTab={setActiveTab} />
          </TopSectionCtn>
        </ContentCtn>
      </MainContent>
    </AppContainer>
  );
};

export default DataCompositionView;


// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: #F7F7F7;
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

const TotalFileCtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex: none;
  margin-top: 3%;
  gap: 20px;
  margin-left: 5%;
`;

const TitleCtn = styled.div`
  display: flex;
  height: 160px;
  width: 300px;
  align-items: center;
`;

const TopCtn = styled.div`
  display: flex;
  flex-direction: row;
  width: 97%;
  justify-content: space-between;
  flex: none;
  gap: 5%;
`;

const TopSectionCtn = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px); /* 200px는 다른 요소들의 높이에 맞춰 조정 필요 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  overflow-x: hidden;
  width: 100%;
  margin-top: 2%;
`;

const Title = styled.div`
  text-align: center;
  color: black;
  font-size: 20px;
  font-weight: 800;
`;

const LoadingMessage = styled.div`
  color: #666;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
`;
