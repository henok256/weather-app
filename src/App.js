import React, { useState, useEffect } from "react";
import axios from "axios";
import { TiWeatherCloudy } from 'react-icons/ti';
import SearchBar from './components/SearchBar';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY="82a3919dcae3aae87c9d5ec0810adcda"

  const searchWeather = async (city) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    searchWeather("Toronto"); // default city
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <SearchBar onSearch={searchWeather} />
      <h1>Weather App</h1>
      <TiWeatherCloudy size={36}/> 
      <h2>City: {weatherData.name}</h2>
      <p><strong>Temperature: {weatherData.main.temp} &#8451;</strong></p>
      <p><strong>Description: {weatherData.weather[0].description}</strong></p>
    </div>
  );
};

export default Weather;
