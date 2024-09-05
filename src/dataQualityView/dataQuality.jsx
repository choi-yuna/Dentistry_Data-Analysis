import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AnalysisContext } from '../context/AnalysisContext';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar';
import FormComponent from '../components/FormComponent';
import DataAnalysisResults from './dataAnalysisResults';
import DataReport from './analysisReport';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
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
  visibility: visible; 
  display: block; 
`;

const DataQualityView = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { dataQualityResults, setDataQualityResults } = useContext(AnalysisContext);

    // 분석된 데이터를 상태로 관리
    const [analyzedData, setAnalyzedData] = useState(null);

    // 분석된 데이터를 설정하는 함수
    const handleAnalyze = (data) => {
      console.log('분석된 데이터:', data);
      setAnalyzedData(data);  // 분석된 데이터를 상태에 저장
      setDataQualityResults(true);  // 분석 결과 표시
    };

    return (
      <AppContainer>
        <TopBar />
        <MainContent>
          <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
          <ContentCtn collapsed={collapsed}>
            {/* 분석 버튼 클릭 시 handleAnalyze 호출 */}
            <FormComponent collapsed={collapsed} onAnalyze={handleAnalyze}/>
            {dataQualityResults && (
              <>
                {/* 분석된 데이터를 DataAnalysisResults에 전달 */}
                <DataAnalysisResults collapsed={collapsed}/>
                <DataReport collapsed={collapsed}  />
              </>
            )}
          </ContentCtn>
        </MainContent>
      </AppContainer>
    );
  };
  

export default DataQualityView;
