"use client";
import browserClient from "@/utils/supabase/client";
import { useUserStore } from "@/zustand/store";
import React, { useEffect, useState } from "react";

const LikeButton = ({ postId }: { postId: string }) => {
  const [isLike, changeLike] = useState<boolean>(false);
  const userId = useUserStore((state) => state.user.userId);
  useEffect(() => {
    const existLike = async () => {
      const response = await getMyLikePostIds(userId).then((res) => res.some((r) => r === postId));
      changeLike(response);
    };
    existLike();
  }, [userId, postId]);
  // 게시물 스크랩하기
  const postMyLikePost = async (userId: string, postId: string) => {
    // 내가 스크랩한 게시물 id 가져오기
    const likeIds = await getMyLikePostIds(userId);

    // 이미 스크랩 한 게시물 판별
    if (!likeIds.some((id) => id === postId)) {
      // 스크랩하기
      await browserClient.from("like").insert({ postId });
      changeLike(true);
    } else {
      // 이미 스크랩 한 게시물 알림
      await deleteMyLikePost(userId, postId);
      changeLike(false);
    }
  };

  return (
    <button
      className="absolute top-1 right-1 text-3xl px-2 border-solid border-2 border-red-300 rounded-xl"
      onClick={(e) => {
        e.preventDefault();
        postMyLikePost(userId, postId);
      }}
    >
      {isLike ? "♥" : "♡"}
    </button>
  );
};

export default LikeButton;

// 내가 스크랩한 게시물의 id 가져오기
export const getMyLikePostIds = async (id: string) => {
  const res = await browserClient.from("like").select("*").eq("mem_no", id);

  if (res.data) {
    return res.data.map((d) => d.postId) as string[];
  } else {
    return [];
  }
};

// 게시물 스크랩 취소하기
const deleteMyLikePost = async (userId: string, postId: string) => {
  const { data } = await browserClient.from("like").select("id").eq("mem_no", userId).eq("postId", postId);
  const deleteLikeId = data && data[0].id;
  await browserClient.from("like").delete().eq("id", deleteLikeId);
};
