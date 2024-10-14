import { post } from "@/types/post";
import { getMyLikePosts } from "@/utils/myPageUtils";
import { useEffect, useState } from "react";
import ListCard from "./ListCard";

const MyLike = () => {
  const [myLikes, setMyLikes] = useState<post[]>([]);
  useEffect(() => {
    const geLikes = async () => {
      const response = await getMyLikePosts("d80cc064-7d51-4488-96cd-0ca145b81ebb");
      setMyLikes(response);
    };
    geLikes();
  }, []);

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
