"use client";
import { useEffect, useState } from "react";
import { useWeatherStore } from "@/zustand/weatherStore";
import Image from "next/image";
import browserClient from "@/utils/supabase/client";
import { post } from "@/types/post";
import ListCard from "@/components/ListCard";

export default function Weatherpages() {
  const { weather, setLocation } = useWeatherStore();
  const [posts, setPosts] = useState<post[]>([]);

  useEffect(() => {
    const lat = 37.5665;
    const lon = 126.978;
    setLocation(lat, lon);
  }, []);

  const fetchPosts = async () => {
    const response = await browserClient.from("post").select("*");

    if (response.data) {
      const today = new Date().toISOString().slice(0, 10);
      const todayPosts = response.data.filter(
        (post: post) => post.created_at && post.created_at.slice(0, 10) === today
      );

      setPosts(todayPosts);
    } else {
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
        />
        <p>기온: {weather.main.temp}°C</p>
      </div>
      <div>
        <h2>오늘 코디</h2>
        {posts.length > 0 ? posts.map((post) => <ListCard key={post.post_id} post={post} />) : <p>게시물이 없습니다</p>}
      </div>
    </div>
  );
}
