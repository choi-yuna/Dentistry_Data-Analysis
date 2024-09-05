import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FileProvider } from './FileContext';
import { DataProvider } from './context/DataContext'; // DataProvider 추가
import DataQualityView from './dataQualityView/dataQuality';
import DataVisualization from './dataVisualizationView/dataVisualizationView';
import FormComponent from './components/FormComponent';
import MyTable from './dataQualityView/dataAnalysisTable';

function App() {
  return (
    <FileProvider>
      <DataProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* DataQualityView에 FormComponent와 MyTable을 함께 사용 */}
              <Route path="/" element={<DataQualityView />} />
              <Route path="/dataVisualization" element={<DataVisualization />} />
            </Routes>
            <div className="copyright">
              COPYRIGHT © FINANCE ALL SOLUTIONS CO., LTD.ALL RIGHT RESERVED.
            </div>
          </div>
        </Router>
      </DataProvider>
    </FileProvider>
  );
}

export default App;
