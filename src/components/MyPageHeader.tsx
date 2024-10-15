"use client";

import browserClient from "@/utils/supabase/client";
import { useUserStore } from "@/zustand/store";
import { useEffect, useState } from "react";
import MyOneYearAgo from "./MyOneYearAgo";
const MyPageHeader = ({ date }: { date: number[] }) => {
  const [myNickname, setMyNickname] = useState<string>("");
  const userId = useUserStore((state) => state.user.userId);

  useEffect(() => {
    // 로그인 정보를 기반으로 닉네임 불러오기
    const getMyInfo = async () => {
      const { data } = await browserClient.from("member").select("mem_nickname").eq("mem_no", userId);
      if (data) {
        setMyNickname(data[0].mem_nickname as string);
      }
    };
    getMyInfo();
  }, [userId]);

  return (
    <div className="bg-black p-10">
      <p className="text-5xl text-white mb-8">{myNickname}`s Page</p>
      <MyOneYearAgo userId={userId} date={date} />
    </div>
  );
};

export default MyPageHeader;
