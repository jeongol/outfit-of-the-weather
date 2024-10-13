import { postMyLikePost } from "@/utils/likeSelect";
import React from "react";

const LikeButton = () => {
  const likeTest = async () => {
    await postMyLikePost("d80cc064-7d51-4488-96cd-0ca145b81ebb", "테스트1");
  };
  return <button onClick={() => likeTest()}>스크랩하기</button>;
};

export default LikeButton;
