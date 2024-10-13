import { getWeatherData } from "@/utils/weatherApi";
import { weatherData } from "@/types/weatherData";

const WeatherPage = async () => {
  const lat = 37.5682; 
  const lon = 126.9778; 
  const weatherData: weatherData = await getWeatherData(lat, lon);

  return (
    <div>
      <h1>Weather in {weatherData.name}</h1>
      <p>{weatherData.weather[0].description}</p>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Feels Like: {weatherData.main.feels_like}°C</p>
    </div>
  );
};

export default WeatherPage;
