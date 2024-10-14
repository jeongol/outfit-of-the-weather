import { ImageType, WriteTypes } from "@/types/write";
import supabase from "./supabase";

export const getPost = async (id: string): Promise<WriteTypes | null> => {
  const { data, error } = await supabase.from("post").select("*").eq("post_id", id).single();

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

  const { data, error } = await supabase.storage
    .from("post")
    .upload(`post_${imageState.imageFile.lastModified}`, imageState.imageFile);

  if (error) throw error;
  return data;
};

// 게시글 추가 함수
export const addPost = async (formData: Omit<WriteTypes, "fileInputRef">) => {
  const { data, error } = await supabase.from("post").insert(formData).select("*");

  if (error) throw error;
  return data;
};
