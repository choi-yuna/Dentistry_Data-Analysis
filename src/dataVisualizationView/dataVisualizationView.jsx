import React from 'react';
import styled from 'styled-components';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TableResult from './TableResult';
import DataSelection from './dataSelection';
import tablesData from './VisualizationDataModel';
import PieChartResult from './PieChartResult';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden; /* 전체 페이지 스크롤을 막음 */
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const StickyDataSelection = styled.div`
  width: 95%;
  margin-top: 20px;
  position: shrink;
  top: 100px;
  background-color: white;
  padding: 10px;
  margin-bottom: 20px;
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
  height: calc(100vh - 150px); /* 페이지 높이에서 특정 값을 뺀 높이 */
  overflow: hidden; /* ContentCtn 내에서 스크롤을 막음 */
`;

const PageTitle = styled.h1`
  margin-bottom: 0px;
  font-size: 28px;
  font-weight: bold;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  width: 100%;
`;

const ReportSection = styled.div`
  width: 100%;
  height: calc(100vh - 200px); /* 페이지 높이에서 상단 요소들을 제외한 높이 */
  overflow-y: auto; /* 이 컨테이너에서만 세로 스크롤을 허용 */
  overflow-x: hidden; /* 가로 스크롤을 숨김 */
`;

const DataVisualizationView = () => {
  return (
    <AppContainer>
      <TopBar />
      <MainContent>
        <MenuBar />
        <ContentCtn>
          <StickyDataSelection>
            <DataSelection />
          </StickyDataSelection>
          <ReportSection>
            <PageTitle>리포트 결과</PageTitle>
            <GridContainer>
              {tablesData.map((table, index) => (
                <React.Fragment key={index}>
                  <TableResult tablesData={[table]} />
                  <PieChartResult chart={table} />
                </React.Fragment>
              ))}
            </GridContainer>
          </ReportSection>
        </ContentCtn>
      </MainContent>
    </AppContainer>
  );
};

export default DataVisualizationView;