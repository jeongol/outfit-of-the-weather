"use client";
import { post } from "@/types/post";
import ListCard from "./ListCard";
import browserClient from "@/utils/supabase/client";
import { getMyLikePostIds } from "./LikeButton";
import { useQuery } from "@tanstack/react-query";

const MyLike = ({ userId, date }: { userId: string; date: number[] }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["myLikes"],
    queryFn: async () => {
      const response = await getMyLikePosts(userId);
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
          {posts.map((myLike) => {
            return <ListCard key={myLike.post_id} post={myLike} />;
          })}
        </div>
      ) : (
        <p className="text-2xl">좋아요한 게시글이 없습니다</p>
      )}
    </>
  );
};

export default MyLike;

// 스크랩한 게시물 가져오기
export const getMyLikePosts = async (id: string) => {
  // 내가 스크랩한 게시물의 id 가져오기
  const likePostIds = await getMyLikePostIds(id);

  // 내가 스크랩한 포스트들
  let myLikePosts: post[] = [];

  // id를 기반으로 게시물 가져오기
  if (likePostIds.length > 0) {
    const likePromises = likePostIds.map(async (likePostId) => {
      const postResponse = await browserClient.from("post").select("*").eq("post_id", likePostId).range(0, 9);

      if (postResponse.data) {
        return postResponse.data[0] as post;
      }
    });
    myLikePosts = (await Promise.all(likePromises)) as post[];
  }

  return myLikePosts;
};
