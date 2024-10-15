"use client";
import { useEffect, useState } from "react";
import { useWeatherStore } from "@/zustand/weatherStore";
import browserClient from "@/utils/supabase/client";
import { post } from "@/types/post";
import ListCard from "@/components/ListCard";
import Image from "next/image";

export default function Mainpages() {
  const { weather, setLocation } = useWeatherStore();
  const [posts, setPosts] = useState<post[] | null>([]);

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

  const fetchPosts = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const response = await browserClient.from("post").select("*").eq("post_date", today);
    const data = response.data;
    setPosts(data);
  };

  fetchPosts();
  if (!posts) {
    return <div>데이터 없음</div>;
  }
  return (
    <div>
      <div>
        <h3>지역: {weather.name}</h3>
        <p>날씨: {weather.weather[0].main}</p>
        <Image
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="날씨 이미지"
          width={80}
          height={80}
          priority={true}
        />
        <p>기온: {weather.main.temp}°C</p>
      </div>
      <div>오늘의 체감온도는 {weather.main.feels_like}°C 입니다. </div>
      <div>
        <h2>오늘 다른사람들이 입은 옷차림을 보여줄게요.</h2>
        {posts.length > 0 ? (
          posts?.map((post) => <ListCard key={post.post_id} post={post} />)
        ) : (
          <p>게시물이 없습니다</p>
        )}
      </div>
    </div>
  );
}
