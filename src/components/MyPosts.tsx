import { post } from "@/types/post";
import browserClient from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const MyPosts = ({ date, userId }: { date: number[]; userId: string }) => {
  const [myPosts, setMyPosts] = useState<post[]>([]);

  // 내가 작성한 게시물 가져오기
  const getMyPosts = async (id: string, date: number[]) => {
    console.log(date);
    const response = await browserClient
      .from("post")
      .select("*")
      .eq("mem_no", id)
      // .textSearch("post_date", String(date[0] + "-" + date[1] + "-*"))
      .range(0, 9);
    if (response.error) {
      return [];
    }
    const myPosts: post[] = response.data || [];
    return myPosts;
  };
  const getPosts = async (id: string) => {
    const response = await getMyPosts(id, date);
    setMyPosts(response);
  };
  useEffect(() => {
    getPosts(userId);
  }, [userId]);
  return (
    <div>
      <p>내 게시글</p>
      {myPosts.length > 0 ? (
        myPosts.map((myPost) => {
          return (
            <div key={myPost.post_id}>
              <p>제목: {myPost.post_title}</p>
              <p>조회수: {myPost.post_view}</p>
              <p>날짜: {myPost.post_date}</p>
              <p>내용: {myPost.post_content}</p>
            </div>
          );
        })
      ) : (
        <p>작성한 글이 없습니다</p>
      )}
    </div>
  );
};

export default MyPosts;
