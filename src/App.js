import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherForecast from './weatherForecast'; 
import HourlyForecast from './hourlyForecast'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WeatherForecast />} /> 
                <Route path="/hourly-forecast" element={<HourlyForecast />} /> 
            </Routes>
        </Router>
    );
};

export default App;
