"use client";
import browserClient from "@/utils/supabase/client";
import { useUserStore } from "@/zustand/store";
import React from "react";

const LikeButton = () => {
  const userId = useUserStore((state) => state.user.userId);
  // 내가 스크랩한 게시물의 id 가져오기
  const getMyLikePostIds = async (id: string) => {
    const { data } = await browserClient.from("member").select("post_id").eq("mem_no", id);
    let myLikePostIds: string[] = [];
    if (data) {
      myLikePostIds = data[0].post_id ? data[0].post_id : [];
    }
    return myLikePostIds;
  };
  // 게시물 스크랩하기
  const postMyLikePost = async (userId: string, postId: string) => {
    // 내가 스크랩한 게시물 id 가져오기
    const likeIds = await getMyLikePostIds(userId);
    console.log("유저아이디=>", userId);
    console.log("업데이트 정보=>", [...likeIds, postId]);

    // 스크랩하기
    const {
      data: { user }
    } = await browserClient.auth.getUser(userId);
    console.log(user);

    // 스크랩 정보 테이블 행 삽입하기
    const response = await browserClient.from("like").insert({ postId: [...likeIds, postId] });
    console.log(response);
  };
  const likeTest = async () => {
    await postMyLikePost(userId, "fa665aa2-5aaa-4d1a-ab08-cc448dc1fdd0");
  };
  return <button onClick={() => likeTest()}>스크랩하기</button>;
};

export default LikeButton;
