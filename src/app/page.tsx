"use client";

import { useEffect } from "react";
import { useWeatherStore } from "@/zustand/weatherstore";

const WeatherComponent = () => {
  const { lat, lon, weather, setLocation } = useWeatherStore();

  useEffect(() => {
    const lat = 37.5665;
    const lon = 126.978;
    setLocation(lat, lon);
  }, [setLocation]);

  if (!weather) return <div>날씨 데이터를 불러오는 중...</div>;

  return (
    <div>
      <h3>도시: {weather.name}</h3>
      <p>날씨: {weather.weather[0].main}</p>
      <p>기온: {weather.main.temp}°C</p>
    </div>
  );
};

export default WeatherComponent;
