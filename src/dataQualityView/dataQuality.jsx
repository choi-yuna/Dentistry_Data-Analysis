import React from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import FormComponent from '../components/FormComponent';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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
`;

// DataQualityView 컴포넌트 정의
const DataQualityView = () => {
  return (
    <AppContainer>
     <TopBar />
      <MainContent>
        <MenuBar />
        <ContentCtn>
          <FormComponent />
        </ContentCtn>
      </MainContent>
    </AppContainer>
  );
};

export default DataQualityView;
