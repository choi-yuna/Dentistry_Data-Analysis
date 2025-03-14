import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AnalysisContext } from '../context/AnalysisContext';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import TableResult from './TableResult';
import DataSelection from './dataSelection';
import PieChartResult from './PieChartResult'; 

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
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
  padding-top: 10px;
  padding-bottom: 5px;
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 95%;
  margin-left: 5%;
`;

const SameHeightContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px; 
  align-items: stretch;
  justify-content: space-between;
`;

const ReportSection = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 25px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #c0392b;
  }
`;

const DataVisualizationView = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState('All');
  const { visualizationResults, setVisualizationResults } = useContext(AnalysisContext);

  const handleAnalyze = () => {
    setVisualizationResults(true);
  };

  const handleDiseaseSelect = (disease) => {
    setSelectedDisease(disease); // 질환을 선택할 때 상태 업데이트
  };

  const handleCloseVisualization = () => {
    setVisualizationResults(false); // 시각화 결과를 삭제
  };

  return (
    <AppContainer>
      <TopBar />
      <MainContent>
        <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} onDiseaseSelect={handleDiseaseSelect} />
        <ContentCtn collapsed={collapsed}>
          <StickyDataSelection>
            <DataSelection disease={selectedDisease} collapsed={collapsed} onAnalyze={handleAnalyze} />
          </StickyDataSelection>
          {visualizationResults && (
            <ReportSection>
              <CloseButton onClick={handleCloseVisualization}>X</CloseButton>
              <GridContainer>
                <SameHeightContainer>
                  <TableResult />
                  <PieChartResult />
                </SameHeightContainer>
              </GridContainer>
            </ReportSection>
          )}
        </ContentCtn>
      </MainContent>
    </AppContainer>
  );
};

export default DataVisualizationView;
