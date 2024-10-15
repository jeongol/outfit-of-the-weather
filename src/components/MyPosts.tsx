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
    }
  });
  if (isLoading) {
    return <div>Loading......</div>;
  }
  const posts = data ? data.filter((myPost) => myPost.post_date.includes(`${date[0]}-${date[1]}`)) : [];
  return (
    <>
      {posts.length > 0 ? (
        <div className="grid grid-cols-4 gap-6 justify-center">
          {posts.map((myPost) => {
            return <ListCard key={myPost.post_id} post={myPost} />;
          })}
        </div>
      ) : (
        <p className="text-5xl">작성한 글이 없습니다</p>
      )}
    </>
  );
};

export default MyPosts;

// 내가 작성한 게시물 가져오기
export const getMyPosts = async (id: string) => {
  const response = await browserClient.from("post").select().eq("mem_no", id);
  if (response.data) {
    const result: post[] = response.data || [];
    return result;
  } else {
    return [];
  }
};
