import { post } from "@/types/post";
import { getMyLikePosts } from "@/utils/myPageUtils";
import { useEffect, useState } from "react";

const MyLike = () => {
  const [myLikes, setMyLikes] = useState<post[]>([]);
  useEffect(() => {
    const getlike = async () => {
      const response = await getMyLikePosts("d80cc064-7d51-4488-96cd-0ca145b81ebb");
      setMyLikes(response);
    };
    getlike();
  }, []);

  return (
    <div>
      <p>내 게시글</p>
      {myLikes.length > 0 ? (
        myLikes.map((myLike) => {
          return (
            <div key={myLike.post_id}>
              <p>제목: {myLike.post_title}</p>
              <p>조회수: {myLike.post_view}</p>
              <p>날짜: {myLike.post_date}</p>
              <p>내용: {myLike.post_content}</p>
              <button className="bg-red-500 text-white">삭제</button>
            </div>
          );
        })
      ) : (
        <p>데이터 없음</p>
      )}
    </div>
  );
};

export default MyLike;
