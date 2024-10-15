import { post } from "@/types/post";
import browserClient from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import ListCard from "./ListCard";

const MyPosts = ({ date, userId }: { date: number[]; userId: string }) => {
  const [myPosts, setMyPosts] = useState<post[]>([]);

  const getPosts = async (id: string) => {
    const response = await getMyPosts(id);
    setMyPosts(response);
  };
  useEffect(() => {
    getPosts(userId);
  }, [userId]);
  return (
    <div>
      <p>내 게시글</p>
      {myPosts.length > 0 ? (
        myPosts
          .filter((myPost) => myPost.post_date.includes(`${date[0]}-${date[1]}`))
          .map((myPost) => {
            return <ListCard key={myPost.post_id} post={myPost} />;
          })
      ) : (
        <p>작성한 글이 없습니다</p>
      )}
    </div>
  );
};

export default MyPosts;

// 내가 작성한 게시물 가져오기
const getMyPosts = async (id: string) => {
  // console.log(String(date[0] + "-" + date[1]));
  // console.log(`${date[0]}-${date[1]}`);
  // const filteringDate = String(date[0] + "-" + date[1]);

  const response = await browserClient.from("post").select().eq("mem_no", id);
  // .ilike("post_date", `%${filteringDate}%`);
  if (response.data) {
    return response.data || [];
  } else {
    return [];
  }
};
