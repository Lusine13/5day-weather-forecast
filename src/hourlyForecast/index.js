import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HourlyForecast = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation to get the location object

    const { hourlyData, selectedDay } = location.state || {}; // Access state safely

    const goBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div>
            <button onClick={goBack}>Go Back</button>
            <h2>Hourly Forecast for {selectedDay}</h2>
            <div className="hourly-forecast-container">
                {hourlyData?.[selectedDay]?.map((hour, index) => (
                    <div className="hourly-forecast-card" key={index}>
                        <h3>{hour.time}</h3>
                        <img src={`https://openweathermap.org/img/wn/${hour.icon}.png`} alt={hour.description} />
                        <p>{hour.temp}°C</p>
                        <p>{hour.description}</p>
                    </div>
                )) || <p>No hourly data available.</p>}
            </div>
        </div>
    );
};

export default HourlyForecast;
