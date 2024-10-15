"use client";

import browserClient from "@/utils/supabase/client";
import { useUserStore } from "@/zustand/store";
import { useEffect, useState } from "react";

const MyPageHeader = () => {
  const [myNickname, setMyNickname] = useState<string>("");
  const userId = useUserStore((state) => state.user.userId);
  useEffect(() => {
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
      <div>
        <p className="text-white">1년 전 오늘 게시글</p>
      </div>
    </div>
  );
};

export default MyPageHeader;
