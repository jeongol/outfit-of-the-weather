"use server";
import { post } from "@/types/post";
import supabase from "@/utils/supabase";

// 내가 작성한 게시물 가져오기
export const getMyPosts = async (id: string, date: number[]) => {
  const response = await supabase
    .from("post")
    .select("*")
    .eq("mem_no", id)
    // .textSearch("post_date", String(date[0] + "-" + date[1] + "-*"))
    .range(0, 9);
  console.log(date);
  if (response.error) {
    return [];
  }
  const myPosts: post[] = response.data || [];
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
    const likePromises = ["357576dc-d9b2-4a06-af75-68aaa1969ff7", "post1", "06733b24-0f24-4446-81fd-76530876e1c3"].map(
      async (likePostId) => {
        const postResponse = await supabase.from("post").select("*").eq("post_id", likePostId).range(0, 9);

        if (postResponse.data) {
          // console.log("데이터", postResponse.data);
          return postResponse.data[0] as post;
        }
        // console.log(postResponse.error);
        //  {
        //   post_id: likePostId,
        //   mem_no: "",
        //   post_title: "데이터가 존재하지 않습니다",
        //   post_category: [],
        //   post_date: "",
        //   post_newdate: "",
        //   post_weather: "",
        //   temperature: 0,
        //   post_view: 0,
        //   post_content: "",
        //   post_img: "no Data Image"
        // };
      }
    );
    myLikePosts = (await Promise.all(likePromises)).filter((n) => !!n);
  }

  return myLikePosts;
};
