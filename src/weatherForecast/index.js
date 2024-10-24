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
            
            const dailyData = {};
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleDateString();
                
                if (!dailyData[date]) {
                    dailyData[date] = {
                        min: item.main.temp_min,
                        max: item.main.temp_max,
                        icon: item.weather[0].icon,
                        description: item.weather[0].description
                    };
                } else {
                    dailyData[date].min = Math.min(dailyData[date].min, item.main.temp_min);
                    dailyData[date].max = Math.max(dailyData[date].max, item.main.temp_max);
                }
            });

            
            const result = Object.entries(dailyData).slice(0, 5).map(([date, temps]) => ({
                date,
                min: temps.min,
                max: temps.max,
                icon: temps.icon,
                description: temps.description
            }));

            setWeatherData(result);   
            
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
                        <h2>{day.date}</h2>
                        <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt={day.description} />
                        <p>High: {day.max}°C</p>
                        <p>Low: {day.min}°C</p>                       
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;
