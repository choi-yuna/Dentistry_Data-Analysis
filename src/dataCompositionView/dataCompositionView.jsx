import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TopSection from './TopSection';


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  transition: width 0.3s ease, height 0.3s ease;
  background-color: #F7F7F7;
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


const DataCompositionView = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('질환별 보기');
 
  return (
    <AppContainer>
      <TopBar />
      <MainContent>
        <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <ContentCtn collapsed={collapsed}>
        <TopSection activeTab={activeTab} setActiveTab={setActiveTab} />
        </ContentCtn>
      </MainContent>
    </AppContainer>
  );
};

export default DataCompositionView;
