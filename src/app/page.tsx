"use client";
import { useEffect, useState } from "react";
import { useWeatherStore } from "@/zustand/weatherStore";
import browserClient from "@/utils/supabase/client";
import { post } from "@/types/post";
import ListCard from "@/components/ListCard";
import Image from "next/image";
import { useUserStore } from "@/zustand/store";
import Link from "next/link";

export default function Mainpages() {
  const { weather, setLocation } = useWeatherStore();
  const [posts, setPosts] = useState<post[] | null>([]);
  const { user } = useUserStore();

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
    const now = new Date();
    const kst = 9 * 60 * 60 * 1000;
    const kstDate = new Date(now.getTime() + kst);
    const today = kstDate.toISOString().slice(0, 10);
    const response = await browserClient.from("post").select("*").eq("post_date", today);
    const data = response.data;

    setPosts(data);
  };

  fetchPosts();
  if (!posts) {
    return <div>데이터 없음</div>;
  }
  // console.log(weather.weather[0].icon);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className=" mt-10 flex flex-col items-center mb-5">
          <div className="text-[20px]">{user.email}님, 안녕하세요</div>
          <div className="text-[20px]">오늘의 OOTW는 어떤가요?</div>
        </div>
        <div className="bg-white w-[600px] rounded-xl shadow-xl">
          <div className=" flex flex-row items-start text-left">
            <div className=" m-5 w-[100px] h-[100px]">
              <Image
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon.slice(0, -1)}d@2x.png`}
                alt="날씨 이미지"
                width={100}
                height={100}
              />
            </div>

            <div className="ml-20 flex flex-col justify-center items-center my-10">
              <h2 className="text-[100px] font-bold">{weather.main.temp}°</h2>
              <p className="text-[20px] font-bold">{weather.weather[0].main}</p>
              <p className="text-lg font-bold">{weather.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex mt-20 flex-row justify-between">
          <div className="flex  text-[20px] font-bold mb-4">오늘의 OOTW 둘러보기</div>
          <Link href={"/list"}> 바로가기 &gt; </Link>
        </div>
        <div className="bg-white rounded-lg shadow-xl">
          <div className="w-[1280px] flex flex-row gap-8 overflow-x-scroll py-10 pl-10 scrollbar-default">
            {posts.length > 0 ? (
              posts.map((post) => <ListCard key={post.post_id} post={post} />)
            ) : (
              <p>다른 사람들의 OOTW를 기다려보세요...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
