import React, { useState } from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import FormComponent from '../components/FormComponent';
import DataAnalysisResults from './dataAnalysisResults';
import DataReport from './analysisReport';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const ContentCtn = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: ${(props) => (props.collapsed ? '0px' : '40px')}; 
  transition: margin-left 0.3s ease;
  margin-top: 10px;
`;

const DataQualityView = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AppContainer>
      <TopBar />
      <MainContent>
        <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <ContentCtn collapsed={collapsed}>
          <FormComponent collapsed={collapsed} />
          <DataAnalysisResults collapsed={collapsed} />
          <DataReport collapsed={collapsed} />
        </ContentCtn>
      </MainContent>
    </AppContainer>
  );
};

export default DataQualityView;
