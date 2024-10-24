import React, { useEffect, useState } from 'react';
import { FETCH_URL } from '../constants';
import './index.css';

const WeatherForecast = () => {
    const [weatherData, setWeatherData] = useState([]);

    const fetchWeather = async () => {
        try {
            const response = await fetch(FETCH_URL);
            if (!response.ok) {
                throw new Error("Error fetching weather data");
            }
            const data = await response.json();
            
            setWeatherData(data.list.filter((_, index) => index % 8 === 0)); 
        } catch (error) {
            console.log("An error occurred while fetching the weather data.", error);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div>
            <h1>5-Day Weather Forecast for Yerevan</h1>
            <div className="forecast-container">
                {weatherData.map((day, index) => (
                    <div className="forecast-card" key={index}>
                        <h2>{new Date(day.dt * 1000).toLocaleDateString()}</h2>
                        <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt={day.weather[0].description} />
                        <p>High: {day.main.temp_max}°C</p>
                        <p>Low: {day.main.temp_min}°C</p>                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;