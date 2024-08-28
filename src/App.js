import React from 'react';
import DataQualityView from './dataQualityView/dataQuality';
import DataVisualization from './dataVisualizationView/dataVisualizationView'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DataQualityView />} />
          <Route path="/dataVisualization" element={<DataVisualization />} />
        </Routes>
      </div>
  </Router>
  );
}

export default App;


