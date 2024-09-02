import React from 'react';
import DataQualityView from './dataQualityView/dataQuality';
import DataVisualization from './dataVisualizationView/dataVisualizationView';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'; 

function App() {
  return (
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
  );
}

export default App;
