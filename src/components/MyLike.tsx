import { post } from "@/types/post";
import { useEffect, useState } from "react";
import ListCard from "./ListCard";
import browserClient from "@/utils/supabase/client";

// 내가 스크랩한 게시물의 id 가져오기
export const getMyLikePostIds = async (id: string) => {
  const { data } = await browserClient.from("member").select("post_id").eq("mem_no", id);
  let myLikePostIds: string[] = [];
  if (data) {
    myLikePostIds = data[0].post_id ? data[0].post_id : [];
  }
  return myLikePostIds;
};

// 스크랩한 게시물 가져오기
export const getMyLikePosts = async (id: string) => {
  // 내가 스크랩한 게시물의 id 가져오기
  const likePostIds = await getMyLikePostIds(id);

  // 내가 스크랩한 포스트들
  let myLikePosts: post[] = [];

  // id를 기반으로 게시물 가져오기
  if (likePostIds.length > 0 || true) {
    const likePromises = ["357576dc-d9b2-4a06-af75-68aaa1969ff7", "post1", "06733b24-0f24-4446-81fd-76530876e1c3"].map(
      async (likePostId) => {
        const postResponse = await browserClient.from("post").select("*").eq("post_id", likePostId).range(0, 9);

        if (postResponse.data) {
          // console.log("데이터", postResponse.data);
          return postResponse.data[0] as post;
        }
        // console.log(postResponse.error);
      }
    );
    myLikePosts = (await Promise.all(likePromises)).filter((n) => !!n);
  }

  return myLikePosts;
};

const MyLike = ({ userId }: { userId: string }) => {
  const [myLikes, setMyLikes] = useState<post[]>([]);
  useEffect(() => {
    const geLikes = async () => {
      const response = await getMyLikePosts(userId);
      setMyLikes(response);
    };
    geLikes();
  }, [userId]);

  return (
    <div>
      <p>내가 좋아요한 게시글</p>
      <div className="grid grid-cols-4">
        {myLikes.length > 0 ? (
          myLikes.map((myLike) => {
            return <ListCard key={myLike.post_id} post={myLike} />;
          })
        ) : (
          <p>좋아요한 게시글이 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default MyLike;
