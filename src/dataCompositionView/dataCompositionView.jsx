// DataCompositionView.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TotalFileStatus from '../components/TotalFileStatus';

const DataCompositionView = () => {
  const [collapsed, setCollapsed] = useState(false);

  // TotalFileStatus 전달 더미데이터
  const background = '#F4F4FF'; 
  const totalFiles = '총파일 수';
  const uploadDate = '2023-11-14';
  const fileCount = 3400;
  const color = '#051C91';

  return (
    <AppContainer>
      <TopBar />
      <MainContent>
        <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <ContentCtn collapsed={collapsed}>
          <TotalFileCtn>
            <TotalFileStatus 
              background={background}
              totalFiles={totalFiles}
              uploadDate={uploadDate}
              fileCount={fileCount}
              color = {color}
            />
            <TotalFileStatus 
              background={'#FFF0EE'}
              totalFiles={'오류 파일 수'}
              uploadDate={uploadDate}
              fileCount={400}
              color = {'#FF1500'}
            />
          </TotalFileCtn>
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
  overflow: hidden;
`;

const TotalFileCtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex: 1;
  margin-top: 3%;
  gap: 20px;
`;