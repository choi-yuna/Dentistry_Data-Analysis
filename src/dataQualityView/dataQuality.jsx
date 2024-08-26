// src/dataQualityView/dataQuality.js
import React from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import FormComponent from '../components/FormComponent';

// Styled Components 정의
const AppContainer = styled.div`
  display: flex;
  flex-direction: column; 
  height: 100vh; 
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  width: 250px;
  flex-shrink: 0; 
`;

const Content = styled.div`
  flex: 1; 
  padding: 20px;
`;

// DataQualityView 컴포넌트 정의
const DataQualityView = () => {
  return (
    <AppContainer>
      <TopBar />
      <MainContent>
        <Sidebar>
          <MenuBar />
        </Sidebar>
        <Content>
          <FormComponent />
        </Content>
      </MainContent>
    </AppContainer>
  );
};

export default DataQualityView;
