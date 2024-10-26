import React, { useEffect, useState } from 'react';
import { FETCH_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
import './index.css';

const WeatherForecast = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const fetchWeather = async () => {
        setLoading(true); 
        try {
            const response = await fetch(FETCH_URL);
            if (!response.ok) {
                throw new Error("Error fetching weather data");
            }
            const data = await response.json();

            const dailyData = {};
            const hourlyDataMap = {};

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

                if (!hourlyDataMap[date]) {
                    hourlyDataMap[date] = [];
                }
                hourlyDataMap[date].push({
                    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    temp: item.main.temp,
                    icon: item.weather[0].icon,
                    description: item.weather[0].description,
                });
            });

            const dailyResult = Object.entries(dailyData).slice(0, 5).map(([date, temps]) => ({
                date,
                min: temps.min,
                max: temps.max,
                icon: temps.icon,
                description: temps.description
            }));

            setWeatherData(dailyResult);
            setHourlyData(hourlyDataMap);
            setLoading(false); // End loading

        } catch (error) {
            setError(error.message); // Set error message
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    const handleDayClick = (date) => {
        navigate('/hourly-forecast', { state: { selectedDay: date, hourlyData } });
    };
    

    if (loading) return <p>Loading...</p>; // Loading state
    if (error) return <p>Error: {error}</p>; // Error message

    return (
        <div>
            <h1>5-Day Weather Forecast for Yerevan</h1>
            <div className="forecast-container">
                {weatherData.map((day, index) => (
                    <div className="forecast-card" key={index} onClick={() => handleDayClick(day.date)}>
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
