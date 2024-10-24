import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherForecast from './weatherForecast'; 

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<WeatherForecast />} />
      </Routes>
    </Router>
  );
};

export default App;