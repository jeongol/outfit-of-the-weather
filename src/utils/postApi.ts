import { ImageType, WriteTypes } from "@/types/write";
import browserClient from "./supabase/client";
// import supabaseServerClient from "./supabase/s";
import { post } from "@/types/post";
import { CommentTypes } from "@/app/(post)/list/[id]/(components)/CommentList";

export const getPost = async (id: string): Promise<post> => {
  const { data, error } = await browserClient.from("post").select("*").eq("post_id", id).single();

  if (error) {
    console.error("데이터 요청 오류:", error);
    throw error;
  }

  return data;
};

// 이미지 업로드 함수
export const uploadImage = async (imageState: ImageType) => {
  if (!imageState.imageFile) {
    throw new Error("이미지 파일이 없습니다.");
  }

  const { data, error } = await browserClient.storage
    .from("post")
    .upload(`post_${imageState.imageFile.lastModified}`, imageState.imageFile);

  if (error) throw error;
  return data;
};

// 게시글 추가 함수
export const addPost = async (formData: Omit<WriteTypes, "fileInputRef">) => {
  const { data, error } = await browserClient.from("post").insert(formData).select("*");

  if (error) throw error;
  return data;
};

export const updatePost = async (id: string, formData: Omit<WriteTypes, "fileInputRef">) => {
  const { data, error } = await browserClient
    .from("post")
    .update({
      post_title: formData.post_title,
      post_content: formData.post_content,
      post_category: formData.post_category,
      post_img: formData.post_img,
      post_newdate: new Date()
    })
    .eq("post_id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deletePost = async (id: string) => {
  const { data, error } = await browserClient.from("post").delete().eq("post_id", id).select();
  console.log(data);
  if (error) throw error;
  return data;
};

export const getMemberInfo = async (postId: string) => {
  const { data, error } = await browserClient
    .from("post")
    .select("*, member(mem_nickname)")
    .eq("post_id", postId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getComment = async (postId: string): Promise<CommentTypes[]> => {
  const { data, error } = await browserClient.from("comment").select("*").eq("post_id", postId);
  if (error) throw error;
  return data; // 배열 형태로 반환
};

export const addComment = async (comment: {
  post_id: string;
  comment_content: string;
  mem_no: string;
  comment_date: Date;
}) => {
  const { data, error } = await browserClient.from("comment").insert([comment]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCommentNickname = async (memNo: string) => {
  const { data, error } = await browserClient.from("member").select("mem_nickname").eq("mem_no", memNo).single();
  if (error) throw error;
  return data;
};

export const deleteComment = async (commentId: string) => {
  const { data, error } = await browserClient.from("comment").delete().eq("comment_id", commentId);
  if (error) throw error;
  return data;
};
