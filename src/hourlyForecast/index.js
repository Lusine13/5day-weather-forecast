import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './index.css';

const HourlyForecast = () => {
    const navigate = useNavigate();
    const { month, day, year } = useParams();
    const formattedDate = `${month}/${day}/${year}`;  
    
    const location = useLocation();
    const hourlyData = location.state?.hourlyData; 

    const goBack = () => {
        navigate(-1);
    };
    
    return (
        <div>
            <button onClick={goBack}>Go Back</button>
            <h2>Hourly Forecast for {formattedDate}</h2>
            <div className="hourly-forecast-container">
                {hourlyData?.[formattedDate]?.map((hour, index) => (
                    <div className="hourly-forecast-card" key={index}>
                        <h3>{hour.time}</h3>
                        <img src={`https://openweathermap.org/img/wn/${hour.icon}.png`} alt={hour.description} />
                        <p>{Math.round(hour.temp)}°C</p> 
                        <p>{hour.description}</p>
                    </div>
                )) || <p>No hourly data available.</p>}
            </div>
        </div>
      
    );

};

export default HourlyForecast;
