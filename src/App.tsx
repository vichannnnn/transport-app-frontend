import React from 'react';
import Map from './components/Map';

const apiUrl = process.env.REACT_APP_API_URL;

const App = () => {
  return (
    <div>
      <h1>MRT Map</h1>
      <Map apiUrl={apiUrl} />
    </div>
  );
};

export default App;