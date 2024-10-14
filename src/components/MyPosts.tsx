import { post } from "@/types/post";
import { getMyPosts } from "@/utils/myPageUtils";
import { useEffect, useState } from "react";

const MyPosts = ({ date }: { date: number[] }) => {
  const [myPosts, setMyPosts] = useState<post[]>([]);

  const getPosts = async (id: string) => {
    const response = await getMyPosts(id, date);
    setMyPosts(response);
  };
  useEffect(() => {
    getPosts("3a50ac73-449a-43fd-9b65-f9455841cc57");
  }, []);
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
