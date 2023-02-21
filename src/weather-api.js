const API_KEY=process.env.REACT_APP_API_KEY;

//http://api.openweathermap.org/data/2.5/weather?q=peshawar&appid=82a3919dcae3aae87c9d5ec0810adcda
const getWeatherData = async (query) => {
    
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

const getForecastData = async (query) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  if (response.ok) {
    return data.list.filter((item) => item.dt_txt.includes('12:00:00'));
  } else {
    throw new Error(data.message);
  }
};

export { getWeatherData, getForecastData };
