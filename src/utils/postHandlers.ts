import { ImageType, WriteTypes } from "@/types/write";
import { uploadImage, addPost } from "@/utils/postApi";
import { UserData } from "@/zustand/store";
import { ChangeEvent, RefObject } from "react";

// 게시글 추가 함수
export const addPostHandler = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: Omit<WriteTypes, "fileInputRef">,
  imageState: ImageType,
  user: UserData,
  resetForm: () => void
) => {
  e.preventDefault();

  try {
    // if (formData.post_title.length === 0 || formData.post_title === "") {
    //   return alert("제목을 입력해주세요");
    // } else if (formData.post_content.length === 0 || formData.post_content === "") {
    //   return alert("내용을 입력해주세요");
    // } else if (formData.post_img.length === 0 || formData.post_img === "") {
    //   return alert("이미지를 업로드해주세요.");
    // }

    if (imageState.imageFile) {
      await uploadImage(imageState);
    }

    const postData = {
      ...formData,
      post_date: new Date(),
      mem_no: user.userId
    };
    await addPost(postData);
    resetForm();
  } catch (error) {
    console.log("글 작성 에러:", error);
  }
};

// 폼 데이터 값 변경하는 함수
export const fieldChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  setFormData: (data: Partial<WriteTypes>) => void
) => {
  const { name, value } = e.target;

  switch (name) {
    case "post_category":
      const tagsArray = value.split("#").map((tag) => tag.trim());
      setFormData({ [name]: tagsArray });
      break;
    case "post_weather":
      setFormData({ post_weather: e.target.value });
      break;
    default:
      setFormData({ [name]: value });
      break;
  }
};

// 해시태그 추가 함수
export const addCategoryHandler = (
  e: React.KeyboardEvent<HTMLInputElement>,
  categoryInput: string,
  setCategoryInput: (input: string) => void,
  formData: Omit<WriteTypes, "fileInputRef">,
  setFormData: (data: Partial<WriteTypes>) => void
) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (categoryInput.length === 0 || categoryInput.trim() === "") {
      setCategoryInput("");
      return alert("빈 태그는 입력할 수 없습니다.");
    }

    if (formData.post_category.some((prevTag) => prevTag === categoryInput.trim())) {
      setCategoryInput("");
      return alert("이미 입력된 태그입니다.");
    }

    setFormData({
      post_category: [...formData.post_category, categoryInput.trim()]
    });
    setCategoryInput("");
  }
};

// 해시태그 삭제 함수
export const removeTagHandler = (
  index: number,
  formData: Omit<WriteTypes, "fileInputRef">,
  setFormData: (data: Partial<WriteTypes>) => void
) => {
  setFormData({
    post_category: formData.post_category.filter((_, i) => i !== index)
  });
};

// 이미지 셋 함수
export const setImageHandler = (
  e: ChangeEvent<HTMLInputElement>,
  setImageState: (data: ImageType) => void,
  setFormData: (data: Partial<WriteTypes>) => void
) => {
  const files = e.target.files;

  if (files && files.length > 0) {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setImageState({ imageFile: file, prevImage: preview });
    setFormData({
      post_img: `https://tmqkkrunjxxrrlkjxkqq.supabase.co/storage/v1/object/public/post/post_${file.lastModified}`
    });
  } else {
    setFormData({ post_img: "" });
  }
};

// 이미지 미리보기 클릭 함수
export const triggerImageInputClick = (fileInputRef: RefObject<HTMLInputElement>) => {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};
