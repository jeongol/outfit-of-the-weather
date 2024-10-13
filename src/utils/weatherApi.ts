import { weatherData } from "@/types/weatherData";

export const getWeatherData = async (lat: number, lon: number): Promise<weatherData> => {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data: weatherData = await response.json();
  return data;
};
