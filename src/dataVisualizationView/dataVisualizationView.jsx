import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AnalysisContext } from '../context/AnalysisContext';
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
  overflow: hidden;
  transition: width 0.3s ease, height 0.3s ease;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const StickyDataSelection = styled.div`
  width: 100%;
  position: shrink;
  top: 100px;
  background-color: white;
  padding: 10px;
`;

const ContentCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  padding: 20px;
  margin-top: 50px;
  margin-left: ${(props) => (props.collapsed ? '5%' : '20%')};
  height: calc(100vh - 150px); 
  overflow: hidden;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  width: 85%;
  margin-left: 5%;
`;

const ReportSection = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  overflow-y: auto; 
  overflow-x: hidden;
`;

const DataVisualizationView = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { visualizationResults, setVisualizationResults } = useContext(AnalysisContext);

  const handleAnalyze = () => {
    setVisualizationResults(true);
  };

  return (
    <AppContainer>
      <TopBar />
      <MainContent>
        <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <ContentCtn collapsed={collapsed}>
          <StickyDataSelection>
            <DataSelection collapsed={collapsed} onAnalyze={handleAnalyze} />
          </StickyDataSelection>
          {visualizationResults && (
            <>
              <ReportSection>
                <GridContainer>
                  {tablesData.map((table, index) => (
                    <React.Fragment key={index}>
                      <TableResult collapsed={collapsed} tablesData={[table]} />
                      <PieChartResult collapsed={collapsed} chart={table} />
                    </React.Fragment>
                  ))}
                </GridContainer>
              </ReportSection>
            </>
          )}
        </ContentCtn>
      </MainContent>
    </AppContainer>
  );
};

export default DataVisualizationView;
