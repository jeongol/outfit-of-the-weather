"use server";
import supabase from "@/utils/supabase";
import { getMyLikePostIds } from "./myPageUtils";

// 게시물 스크랩하기
export const postMyLikePost = async (userId: string, postId: string) => {
  // 내가 스크랩한 게시물 id 가져오기
  const { data } = await supabase.from("member").select("post_id").eq("mem_no", userId);
  let myLikePostIds: string[] = [];
  if (data) {
    myLikePostIds = data[0].post_id ? data[0].post_id : [];
  }
  console.log([...myLikePostIds, postId]);

  // 게시물 스크랩하기
  // 직접 member 테이블을 수정하려고 하니까 안 되는 것 같다.
  // auth 함수를 통해야 할 듯 + 로그인 먼저
  const respon = await supabase
    .from("member")
    .update({ post_id: [...myLikePostIds, postId] })
    .eq("mem_no", userId);

  if (respon.error) {
    console.log(respon.error);
  }

  // 위쪽의 직접 접근은 안 되니까 이쪽 auth함수를 쓸 수 있도록 개선해야 할 것 같다
  // const respon1 = await supabase.auth.updateUser({options:{post_id:[...myLikePostIds, postId]}})
};

export const deleteMyLikePost = async (userId: string, postId: string) => {
  // 내가 스크랩한 게시물 id 가져오기
  const likePostIds = getMyLikePostIds(userId);
  console.log(likePostIds);
  console.log(postId);
};
