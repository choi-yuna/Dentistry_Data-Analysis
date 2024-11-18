import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FileProvider } from './FileContext';
import { DataProvider } from './context/DataContext'; 
import { DataSelectionProvider } from './context/DataSelectionContext'; 
import { AnalysisProvider } from './context/AnalysisContext';
import { DiseaseDataProvider } from './context/DiseaseDataContext'; // DiseaseDataProvider import
import DataQualityView from './dataQualityView/dataQuality';
import DataCompositionView from './dataCompositionView/dataCompositionView';
import DataVisualization from './dataVisualizationView/dataVisualizationView';
import './App.css'; 

function App() {
  return (
    <FileProvider>
      <DataProvider>
        <DataSelectionProvider>
          <AnalysisProvider>
            <DiseaseDataProvider> 
              <Router basename="/data-analysis">
                <div className="App">
                  <Routes>
                    <Route path="/" element={<DataCompositionView />} />
                    <Route path="/dataQuality" element={<DataQualityView />} />
                    <Route path="/dataVisualization" element={<DataVisualization />} />
                  </Routes>
                  <div className="copyright">
                    COPYRIGHT © FINANCE ALL SOLUTIONS CO., LTD.ALL RIGHT RESERVED.
                  </div>
                </div>
              </Router>
            </DiseaseDataProvider>
          </AnalysisProvider>
        </DataSelectionProvider>
      </DataProvider>
    </FileProvider>
  );
}

export default App;
