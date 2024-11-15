import React, { useState } from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TotalFileStatus from '../components/TotalFileStatus';
import TopSection from './TopSection';

const DataCompositionView = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('질환별 보기');
  
  //테스트용 더미데이터
  const fileStatuses = [
    { 
      background: '#F4F4FF', 
      totalFiles: '총파일 수', 
      uploadDate: '2023-11-14', 
      fileCount: 3400, 
      totalFilesCount: 5000, 
      showGraph: false 
    },
    { 
      background: '#FFF0EE', 
      totalFiles: '오류 파일 수', 
      uploadDate: '2023-11-14', 
      fileCount: 400, 
      totalFilesCount: 5000, 
      showGraph: false 
    },
    { 
      totalFiles: '구축율', 
      uploadDate: '2023-11-14', 
      fileCount: 1000, 
      totalFilesCount: 2000, 
      showGraph: true 
    }
  ];
  

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
              {fileStatuses.map((status, index) => (
                <TotalFileStatus key={index} {...status} />
              ))}
            </TotalFileCtn>
          </TopCtn>
          <TopSection activeTab={activeTab} setActiveTab={setActiveTab} />
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
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  padding: 20px;
  margin-top: 30px;
  margin-left: ${(props) => (props.collapsed ? '5%' : '20%')};
  height: calc(100vh - 80px); 
  width: 100vh;
  overflow: hidden;
`;

const TotalFileCtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex: none;
  height: 80px;
  margin-top: 3%;
  gap: 20px;
  margin-left: 5%;
`;

const TitleCtn = styled.div`
  display: flex;
  height: 160px;
  width: 300px;
  align-items: center;
`

const TopCtn = styled.div`
  display: flex;
  flex-direction: row;
  width: 97%;
  justify-content: space-between;
  flex: none;
  gap: 5%;
`


const Title = styled.div`
  text-align: center;
  color: black;
  font-size: 20px;
  font-weight: 800;
`

