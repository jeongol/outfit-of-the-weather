"use client";

import browserClient from "@/utils/supabase/client";
import { useUserStore } from "@/zustand/store";
import MyOneYearAgo from "./MyOneYearAgo";
import { useQuery } from "@tanstack/react-query";

const MyPageHeader = ({ date }: { date: number[] }) => {
  const userId = useUserStore((state) => state.user.userId);

  const { data, isLoading } = useQuery({
    queryKey: ["userNickname"],
    queryFn: async () => {
      const response = await getMyInfo(userId);
      return response;
    },
    enabled: !!userId
  });
  if (isLoading) {
    return <div>Loading......</div>;
  }

  return (
    <div className="bg-subOrange w-full p-10 mt-10 rounded-lg">
      <p className="text-5xl text-white mb-8">{data}`s Page</p>
      {!!userId ? <MyOneYearAgo userId={userId} date={date} /> : <></>}
    </div>
  );
};

export default MyPageHeader;

// 로그인 정보를 기반으로 닉네임 불러오기
const getMyInfo = async (userId: string) => {
  const { data } = await browserClient.from("member").select("mem_nickname").eq("mem_no", userId);
  if (data) {
    return data[0].mem_nickname as string;
  }
};
