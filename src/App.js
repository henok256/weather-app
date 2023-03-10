import React, { useState, useEffect } from "react";
import { TiWeatherCloudy } from 'react-icons/ti';
import axios from "axios";
import SearchBar from './components/SearchBar';
const countryList =require('country-list');

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [country, setCountry] =useState('Canada');
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
      const {sys}=response.data;
      setCountry(countryList.getName(sys.country));
      setLoading(false);
      setError(null);
    } catch (error) {
      setError("make sure you have the internet connection or you entered the correct spelling of the city");
      setLoading(false);
    }
  };

  useEffect(() => {
    searchWeather("Toronto"); // default city
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <SearchBar onSearch={searchWeather} />
      <h1>Weather App</h1>
      <TiWeatherCloudy size={36}/> 
      <h2>City: {weatherData.name}, {country}</h2>
      <p><strong>Temperature: {weatherData.main.temp} &#8451;</strong></p>
      <p><strong>Description: {weatherData.weather[0].description}</strong></p>
    </div>
  );
};

export default Weather;
