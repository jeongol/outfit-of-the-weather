"use server";
import { post } from "@/types/post";
import supabase from "@/utils/supabase";

// 내가 작성한 게시물 가져오기
export const getMyPosts = async (id: string) => {
  const response = await supabase.from("post").select("*").eq("mem_no", id);
  if (response.error) {
    throw new Error("내 포스트를 불러올 수 없습니다");
  }
  const myPosts = response.data as post[];
  return myPosts;
};

export const getMyLikePostIds = async (id: string) => {
  // 내가 스크랩한 게시물의 id 가져오기
  const { data } = await supabase.from("member").select("post_id").eq("mem_no", id);
  let myLikePostIds: string[] = [];
  if (data) {
    myLikePostIds = data[0].post_id ? data[0].post_id : [];
  }
  return myLikePostIds;
};

// 스크랩한 게시물 가져오기
export const getMyLikePosts = async (id: string) => {
  // 내가 스크랩한 게시물의 id 가져오기
  const likePostIds = await getMyLikePostIds(id);

  // 내가 스크랩한 포스트들
  let myLikePosts: post[] = [];

  // id를 기반으로 게시물 가져오기
  if (likePostIds.length > 0) {
    console.log("스크랩 정보 있음");
    const likePromises = ["4fc6584e-2946-4335-94df-f1f63e335118", "post1"].map(async (likePostId) => {
      const postResponse = await supabase.from("post").select("*").eq("post_id", likePostId);

      if (postResponse.data) {
        // console.log("데이터", postResponse.data);
        return postResponse.data[0] as post;
      } else {
        // console.log(postResponse.error);
        return {
          post_id: likePostId,
          mem_no: "",
          post_title: "데이터가 존재하지 않습니다",
          post_category: [],
          post_date: "",
          post_newdate: "",
          post_weather: "",
          temperature: 0,
          post_view: 0,
          post_content: "",
          post_img: "no Data Image"
        };
      }
    });
    myLikePosts = await Promise.all(likePromises);
  }

  return myLikePosts;
};
