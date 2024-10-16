"use client";
import { useWriteStore } from "@/zustand/writeStore";
import React, { useEffect } from "react";
import { fieldChangeHandler } from "@/utils/postHandlers";
import { useUserStore } from "@/zustand/store";
import ImageUploader from "@/app/(post)/write/(components)/ImageUploader";
import InputField from "@/app/(post)/write/(components)/InputField";
import Category from "@/app/(post)/write/(components)/Category";
import { getPost } from "@/utils/postApi";
import { useUpdatePost } from "@/hooks/useMutates";
import { post } from "@/types/post";

interface Props {
  params: {
    id: string;
  };
}

const Page = ({ params }: Props) => {
  const postId = params.id;
  const { user } = useUserStore();
  const { formData, imageState, categoryInput, setFormData, setImageState, setCategoryInput } = useWriteStore();

  useEffect(() => {
    const handleGetPost = async () => {
      const postData: post | null = await getPost(postId);
      console.log(postData);

      setFormData({
        post_title: postData?.post_title,
        temperature: postData?.temperature,
        post_weather: postData?.post_weather,
        post_content: postData?.post_content,
        post_category: postData?.post_category,
        post_img: postData?.post_img
      });
      setImageState({ imageFile: null, prevImage: postData?.post_img || "" });
    };

    handleGetPost();
  }, [postId, setFormData, setImageState]);

  const updatePostMutation = useUpdatePost(postId);

  const handleUpdatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePostMutation.mutate({ postId, formData, imageState, user });
  };

  return (
    <div className="m-0">
      <h1>글 작성</h1>
      <form className="flex flex-row" onSubmit={handleUpdatePost}>
        <ImageUploader imageState={imageState} setImageState={setImageState} setFormData={setFormData} />
        <div>
          <InputField
            type="input"
            label="제목"
            name="post_title"
            value={formData.post_title}
            onChange={(e) => fieldChangeHandler(e, setFormData)}
            isDisabled={false}
          />
          <div className="flex flex-row">
            <InputField
              type="number"
              label="온도"
              name="temperature"
              value={formData.temperature}
              onChange={(e) => fieldChangeHandler(e, setFormData)}
              isDisabled={true}
            />
            <InputField
              type="select"
              label="날씨"
              name="post_weather"
              value={formData.post_weather}
              onChange={(e) => fieldChangeHandler(e, setFormData)}
              isDisabled={true}
            />
          </div>
          <div className="flex flex-col">
            <InputField
              type="textarea"
              label="내용"
              name="post_content"
              value={formData.post_content}
              onChange={(e) => fieldChangeHandler(e, setFormData)}
              isDisabled={false}
            />
          </div>
          <Category
            categoryInput={categoryInput}
            setCategoryInput={setCategoryInput}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
};

export default Page;
