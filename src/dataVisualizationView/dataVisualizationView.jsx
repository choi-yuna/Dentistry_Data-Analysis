import React from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TableResult from './TableResult';
import DataSelection from './dataSelection';
import tablesData from './VisualizationDataModel';

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
  margin-top: 50px;
  margin-left: 30px;
`;

const PageTitle = styled.h1`
  margin-bottom: 0px;
  font-size: 28px;
  font-weight: bold;
`;


const IconContainer = styled.div`
  display: flex; 
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
  cursor: pointer;
  margin-left: 10px;
`;



const DataVisualization = () => {
  return (
    <AppContainer>
      <TopBar />
      <MainContent>
        <MenuBar />
        <ContentCtn>
          <DataSelection/>
          <PageTitle>리포트 결과</PageTitle>
          <TableResult tablesData={tablesData} />
        </ContentCtn>
      </MainContent>
    </AppContainer>
  );
};

export default DataVisualization;
