"use client";
import { post } from "@/types/post";
import browserClient from "@/utils/supabase/client";
import ListCard from "./ListCard";
import { useQuery } from "@tanstack/react-query";

const MyPosts = ({ date, userId }: { date: number[]; userId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
      const response = await getMyPosts(userId);
      return response;
    },
    enabled: !!userId,
    staleTime: 0
  });
  if (isLoading) {
    return <div>Loading......</div>;
  }
  const posts = data ? data.filter((myPost) => myPost.post_date.includes(`${date[0]}-${date[1]}`)) : [];
  return (
    <>
      {posts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-xl max-w-[1280px] mx-auto mb-20 px-6">
          <div className="grid grid-cols-4 gap-4 py-6 min-h-[400px]">
            {posts.map((myPost) => {
              return <ListCard key={myPost.post_id} post={myPost} />;
            })}
          </div>
        </div>
      ) : (
        <p className="text-2xl text-center">작성한 글이 없습니다</p>
      )}
    </>
  );
};

export default MyPosts;

// 내가 작성한 게시물 가져오기
export const getMyPosts = async (id: string) => {
  const response = await browserClient.from("post").select("*").eq("mem_no", id);
  if (response.data) {
    const result: post[] = response.data || [];
    return result;
  } else {
    return [];
  }
};
