import React from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TableResult from './TableResult';



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
  margin-top:50px;
   margin-left:30px;
`;


const DataVisualization = () => {
  return (
    <AppContainer>
     <TopBar />
      <MainContent>
        <MenuBar />
        <ContentCtn>
            <TableResult/>
        </ContentCtn>
      </MainContent>
    </AppContainer>
  );
};

export default DataVisualization;
