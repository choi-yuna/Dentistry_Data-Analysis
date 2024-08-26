import React from 'react';

import MenuBar from './components/menubar';
import Topbar from './components/topbar';
import FormComponent from './components/FormComponent';

function App() {
  return (
    <div className="App">
      <Topbar />
      <MenuBar />
      <FormComponent />
    </div>
  );
}

export default App;
