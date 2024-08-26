// src/dataQualityView/dataQuality.js
import React from 'react';
import TopBar from '../components/topbar';
import MenuBar from '../components/menubar'; 
import FormComponent from '../components/FormComponent';
import AnalysisReport from '../components/analysisReport';

const DataQualityView = () => {
  return (
    <div>
      <TopBar />
      <MenuBar />
      <FormComponent/>
      <AnalysisReport/>
    </div>
  );
};

export default DataQualityView;
