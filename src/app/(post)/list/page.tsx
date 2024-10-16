"use client";

import ListCard from "@/components/ListCard";
import { post } from "@/types/post";
import { useWeatherStore } from "@/zustand/weatherStore";
import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 날씨 모음
const weatherMainTranslations: { [key: string]: string } = {
  맑음: "맑음",
  흐림: "흐림",
  비: "비",
  이슬비: "이슬비",
  천둥번개: "천둥번개",
  눈: "눈",
  안개: "안개",
  연기: "연기",
  실안개: "실안개",
  먼지: "먼지",
  모래: "모래",
  화산재: "화산재",
  돌풍: "돌풍",
  토네이도: "토네이도"
};

const weatherOptions = Object.keys(weatherMainTranslations);

const Page: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [data, setData] = useState<post[]>([]);
  const [selectedWeather, setSelectedWeather] = useState<string[]>([]);

  const { weather, setLocation } = useWeatherStore();

  useEffect(() => {
    const soeul = { lat: 37.5665, lon: 126.978 };

    const geoloat = (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setLocation(lat, lon);
    };

    const headleError = () => {
      setLocation(soeul.lat, soeul.lon);
    };

    navigator.geolocation.getCurrentPosition(geoloat, headleError);
  }, [setLocation]);

  useEffect(() => {
    if (weather.main.temp) {
      setValue(weather.main.temp);
    }
  }, [weather]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleToggleWeather = (weather: string) => {
    setSelectedWeather((prevSelected) =>
      prevSelected.includes(weather) ? prevSelected.filter((w) => w !== weather) : [...prevSelected, weather]
    );
    console.log(selectedWeather);
  };

  useEffect(() => {
    const fetchData = async () => {
      let query = supabase.from("post").select("*").eq("temperature", value);

      if (selectedWeather.length > 0) {
        query = query.in("post_weather", selectedWeather);
      }

      const { data, error } = await query;

      if (error) {
        console.error("데이터를 가지고 오는데 오류가 생겼습니다 =>", error);
      } else {
        setData(data || []);
      }
    };

    fetchData();
  }, [value, selectedWeather]);

  return (
    <>
      <div className="w-[1280px] border pt-6 flex flex-col justify-center items-center">
        <div className="flex flex-col w-[800px] items-center py-4">
          <h2 className="text-[25px] font-bold mb-2">온도</h2>
          <h3 className="text-[18px] mb-2">OOTW가 궁금한 온도를 검색해주세요</h3>
          <div className="flex flex-col w-full max-w-xs space-y-4 mt-4 justify-center items-center">
            <input
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black text-center w-[350px]"
              value={value}
              onChange={handleChange}
              type="number"
              min="-40"
              max="40"
              placeholder="온도를 입력해주세요"
            />
            <input
              type="range"
              min="-40"
              max="40"
              value={value}
              onChange={handleChange}
              className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider  w-[350px]"
            />
            <p>날씨: {weather.weather[0].main}</p>
          </div>
        </div>

        <div className="flex flex-col w-[800px] items-center py-4 mt-4">
          <h2 className="text-[25px] font-bold mb-2">날씨</h2>
          <h3 className="text-[18px] mb-2">날씨를 선택해주세요</h3>
          <div className="flex gap-4 flex-wrap justify-center mt-4">
            {weatherOptions.map((weather) => (
              <button
                key={weather}
                className={`w-[80px] h-[30px] text-[14px] font-medium rounded transition-all duration-300 ease-in-out ${
                  selectedWeather.includes(weather)
                    ? "bg-blue-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
                onClick={() => handleToggleWeather(weather)}
              >
                {weatherMainTranslations[weather]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border w-[1280px] flex flex-col pt-10">
        <div>리스트 부분</div>
        <div>
          {data.length > 0 ? (
            <div className="flex gap-4">
              {data.map((post) => {
                return <ListCard key={post.post_id} post={post} />;
              })}
            </div>
          ) : (
            <p className="text-5xl">게시글이 없습니다</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
