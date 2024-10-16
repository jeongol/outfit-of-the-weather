"use client";
import { getMyPosts } from "./MyPosts";

import { useQuery } from "@tanstack/react-query";
import ListCard from "./ListCard";

const MyOneYearAgo = ({ date, userId }: { date: number[]; userId: string }) => {
  // 1년 전 이 달의 게시물 4개 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["1YearAgoPost"],
    queryFn: async () => {
      const response = await getMyPosts(userId);
      const oneAgo = response.filter((post) => post.post_date.includes(`${date[0] - 1}-${date[1]}`));
      return oneAgo.slice(0, 2) || [];
    },
    enabled: !!userId,
    staleTime: 0
  });
  if (isLoading) {
    return <div>Loading......</div>;
  }
  return (
    <div>
      <p className="text-white text-2xl mb-5">1년 전 이달 게시글</p>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-4 gap-6 justify-center">
          {data.map((oneAgoPost) => (
            <ListCard key={oneAgoPost.post_id} post={oneAgoPost} />
          ))}
        </div>
      ) : (
        <p className="text-white">1년 전 게시글이 없습니다</p>
      )}
    </div>
  );
};

export default MyOneYearAgo;
