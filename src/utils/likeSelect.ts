"use server";
import supabase from "@/utils/supabase/client";
import { getMyLikePostIds } from "./myPageUtils";

// 게시물 스크랩하기
export const postMyLikePost = async (userId: string, postId: string) => {
  // 내가 스크랩한 게시물 id 가져오기
  const likeIds = await getMyLikePostIds(userId);
  console.log("유저아이디=>", userId);
  console.log("업데이트 정보=>", [...likeIds, postId]);

  // 스크랩 정보 테이블 행이 있는지 확인
  // const res = await supabase.from("like").select("*").eq("mem_no", userId);
  // console.log(res);
  const {
    data: { user }
  } = await supabase.auth.getUser(userId);
  console.log(user);

  // 스크랩 정보 테이블 행 삽입하기
  const response = await supabase.from("like").insert({ postId: [...likeIds, postId] });
  console.log(response);
  // 게시물 스크랩하기
  // 직접 member 테이블을 수정하려고 하니까 안 되는 것 같다.
  // auth 함수를 통해야 할 듯 + 로그인 먼저
  // const respon = await supabase
  //   .from("like")
  //   .update({ post_id: [...myLikePostIds, postId] })
  //   .eq("mem_no", userId)
  //   .select();

  // if (respon.error) {
  //   console.log(respon.error);
  // }

  // console.log(respon);
  // // 위쪽의 직접 접근은 안 되니까 이쪽 auth함수를 쓸 수 있도록 개선해야 할 것 같다
  // const respon1 = await supabase.auth.admin.getUserById(userId);
  // console.log(respon1);
};

// 스크랩 삭제하기
export const deleteMyLikePost = async (userId: string, postId: string) => {
  // 내가 스크랩한 게시물 id 가져오기
  const likePostIds = getMyLikePostIds(userId);
  console.log(likePostIds);
  console.log(postId);
};
