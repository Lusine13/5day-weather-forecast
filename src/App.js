import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherForecast from './weatherForecast'; 
import HourlyForecast from './hourlyForecast'; 
import autumnVideo from './video/automn.mp4'; 
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="video-background">
                <video autoPlay muted loop>
                    <source src={autumnVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<WeatherForecast />} /> 
                        <Route path="/hourly-forecast/:month/:day/:year" element={<HourlyForecast />} /> 
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
