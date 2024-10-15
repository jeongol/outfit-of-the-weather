"use client";

import { useEffect } from "react";
import { useWeatherStore } from "@/zustand/weatherStore";

const WeatherComponent = () => {
  const { lat, lon, weather, loading, setLocation } = useWeatherStore();

  useEffect(() => {
    const lat = 37.5665;
    const lon = 126.978;
    setLocation(lat, lon);
  }, [setLocation]);

  if (weather === null)
    return (
      <>
        <h3>지역: 알 수 없는 지역</h3>
        <p>날씨: 정보 없음</p>
        <p>기온: 0°C</p>
      </>
    );

  return (
    <div>
      {loading ? (
        <div>날씨 데이터를 불러오는 중...</div>
      ) : (
        <>
          <h3>지역: {weather.name || "알 수 없는 지역"}</h3>
          <p>날씨: {weather.weather[0].main || "정보 없음"}</p>
          <p>기온: {weather.main.temp || 0}°C</p>
        </>
      )}
    </div>
  );
};

export default WeatherComponent;
