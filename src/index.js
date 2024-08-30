import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AnalysisProvider } from './context/AnalysisContext'; // AnalysisProvider를 가져옵니다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AnalysisProvider> 
      <App />
    </AnalysisProvider>
  </React.StrictMode>
);

reportWebVitals();
