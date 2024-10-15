"use client";

import browserClient from "@/utils/supabase/client";
import { useUserStore } from "@/zustand/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMyPosts } from "./MyPosts";
import Image from "next/image";

const MyPageHeader = ({ date }: { date: number[] }) => {
  const [myNickname, setMyNickname] = useState<string>("");
  const userId = useUserStore((state) => state.user.userId);
  const user = useUserStore((state) => state.user);
  console.log(user);

  useEffect(() => {
    const getMyInfo = async () => {
      const { data } = await browserClient.from("member").select("mem_nickname").eq("mem_no", userId);
      if (data) {
        setMyNickname(data[0].mem_nickname as string);
      }
    };
    getMyInfo();
  }, [userId]);

  const { data, isLoading } = useQuery({
    queryKey: ["1YearAgoPost"],
    queryFn: async () => {
      const response = await getMyPosts(userId);
      return response.filter((post) => post.post_date.includes(`${date[0] - 1}-${date[1]}`));
    }
  });
  if (isLoading) {
    return <div>Loading......</div>;
  }

  return (
    <div className="bg-black p-10">
      <p className="text-5xl text-white mb-8">{myNickname}`s Page</p>
      <div>
        <p className="text-white text-2xl mb-5">1년 전 이달 게시글</p>
        {data && data.length > 0 ? (
          <Image src={data[0].post_img} width={200} height={200} alt={data[0].post_title} />
        ) : (
          <p className="text-white">1년 전 게시글이 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default MyPageHeader;
