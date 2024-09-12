import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FileProvider } from './FileContext';
import { DataProvider } from './context/DataContext'; 
import { DataSelectionProvider } from './context/DataSelectionContext'; 
import { AnalysisProvider } from './context/AnalysisContext'; // AnalysisProvider import
import DataQualityView from './dataQualityView/dataQuality';
import DataVisualization from './dataVisualizationView/dataVisualizationView';
import './App.css'; 

function App() {
  return (
    <FileProvider>
      <DataProvider>
        <DataSelectionProvider>
          <AnalysisProvider> {/* AnalysisProvider로 감싸기 */}
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<DataQualityView />} />
                  <Route path="/dataVisualization" element={<DataVisualization />} />
                </Routes>
                <div className="copyright">
                  COPYRIGHT © FINANCE ALL SOLUTIONS CO., LTD.ALL RIGHT RESERVED.
                </div>
              </div>
            </Router>
          </AnalysisProvider>
        </DataSelectionProvider>
      </DataProvider>
    </FileProvider>
  );
}

export default App;
