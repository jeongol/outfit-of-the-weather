import { weatherData } from "@/types/weatherData";

// 날씨 언어 한글로 번역
const weatherMainTranslations: { [key: string]: string } = {
  Clear: "맑음",
  Clouds: "흐림",
  Rain: "비",
  Drizzle: "이슬비",
  Thunderstorm: "천둥번개",
  Snow: "눈",
  Mist: "안개",
  Smoke: "연기",
  Haze: "실안개",
  Dust: "먼지",
  Fog: "안개",
  Sand: "모래",
  Ash: "화산재",
  Squall: "돌풍",
  Tornado: "토네이도"
};

// 날씨 api호출
export const getWeatherData = async (lat: number, lon: number): Promise<weatherData> => {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  );

  if (!response.ok) {
    return Promise.reject(new Error("날씨 데이터 불러오기 실패"));
  }

  const data: weatherData = await response.json();

  data.weather[0].main = weatherMainTranslations[data.weather[0].main] || data.weather[0].main;

  data.main.temp = Math.round(data.main.temp);

  return data;
};
