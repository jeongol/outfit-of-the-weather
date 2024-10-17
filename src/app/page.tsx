"use client";
import { useEffect, useRef, useState } from "react";
import { useWeatherStore } from "@/zustand/weatherStore";
import browserClient from "@/utils/supabase/client";
import { post } from "@/types/post";
import ListCard from "@/components/ListCard";
import Image from "next/image";
import { useUserStore } from "@/zustand/store";
import Link from "next/link";
import { formatDateTime } from "@/components/DateAndTime";

export default function Mainpages() {
  const { weather, setLocation } = useWeatherStore();
  const [posts, setPosts] = useState<post[] | null>([]);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const { user } = useUserStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const soeul = { lat: 37.5665, lon: 126.978 };

    const geoloat = (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setLocation(lat, lon);
      setLoadingWeather(false);
    };

    const headleError = () => {
      setLocation(soeul.lat, soeul.lon);
      setLoadingWeather(false);
    };

    const fetchPosts = async () => {
      const response = await browserClient.from("post").select("*");
      const data = response.data;
      setPosts(data);
    };

    const handleWheel = (e: WheelEvent) => {
      if (scrollRef.current) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const current = scrollRef.current;
    if (current) {
      current.addEventListener("wheel", handleWheel);
    }

    fetchPosts();
    navigator.geolocation.getCurrentPosition(geoloat, headleError);
  }, [setLocation]);

  if (!posts) {
    return <div>데이터 없음</div>;
  }

  const today = formatDateTime(new Date()).slice(0, 10);
  const filteredData = posts?.filter((d) => d.post_date.slice(0, 10) === today);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="mt-10 flex flex-col items-center mb-5">
          {user.email ? (
            <>
              <div className="text-[20px]">{user.email}님, 안녕하세요</div>
              <div className="text-[20px]">오늘의 OOTW는 어떤가요?</div>
            </>
          ) : (
            <>
              <div className="text-[20px]">로그인 후 OOTW를 자랑해주세요</div>
              <Link href={"/login"} className="text-[16px] underline">
                로그인 하러하기
              </Link>
            </>
          )}
        </div>
        <div className="bg-white w-[600px] rounded-xl shadow-xl">
          <div className="flex flex-row items-start text-left">
            <div className="m-5 w-[100px] h-[100px]">
              <Image
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon.slice(0, -1)}d@2x.png`}
                alt="날씨 이미지"
                width={100}
                height={100}
              />
            </div>

            {loadingWeather ? (
              <div className="ml-20 flex flex-col justify-center items-center my-10 h-[200px]">
                <div>날씨를 불러오고 있습니다</div>
              </div>
            ) : (
              <div className="ml-20 flex flex-col justify-center items-center my-10">
                <h2 className="text-[100px] font-bold">{weather.main.temp}°</h2>
                <p className="text-[20px] font-bold">{weather.weather[0].main}</p>
                <p className="text-lg font-bold">{weather.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex mt-20 flex-row justify-between">
          <div className="flex text-[20px] font-bold mb-4">오늘의 OOTW 둘러보기</div>
          <Link href={"/list"}> 바로가기 &gt; </Link>
        </div>
        <div className="bg-white rounded-lg shadow-xl mb-20">
          <div ref={scrollRef} className="w-[1280px] flex flex-row gap-8 overflow-x-scroll py-10 pl-10 pr-10">
            {filteredData.length > 0 ? (
              filteredData.map((post) => <ListCard key={post.post_id} post={post} />)
            ) : (
              <p>다른 사람들의 OOTW를 기다려보세요...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
