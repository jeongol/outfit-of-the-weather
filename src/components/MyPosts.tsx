import { post } from "@/types/post";
import { getMyPosts } from "@/utils/myPageUtils";
import { useEffect, useState } from "react";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState<post[]>([]);

  const getPosts = async () => {
    const response = await getMyPosts("3a50ac73-449a-43fd-9b65-f9455841cc57");
    setMyPosts(response);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <p>내 게시글</p>
      {myPosts.map((myPost) => {
        return (
          <div key={myPost.post_id}>
            <p>제목: {myPost.post_title}</p>
            <p>조회수: {myPost.post_view}</p>
            <p>날짜: {myPost.post_date}</p>
            <p>내용: {myPost.post_content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MyPosts;
