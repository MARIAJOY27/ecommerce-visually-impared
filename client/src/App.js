import React from 'react';
import useAlan from './hooks/useAlan';
import Home from './Home';


function App() {


  useAlan();

  return <Home />;
}

export default App;
