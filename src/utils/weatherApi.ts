import { WeatherData } from "@/types/type";

export const getWeather = async (city: string): Promise<WeatherData | null> => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error("오류 발생", error);
    return null;
  }
};
