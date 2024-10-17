"use client";
import React, { useEffect, useState } from "react";
import ImageUploader from "./(components)/ImageUploader";
import Category from "./(components)/Category";
import InputField from "./(components)/InputField";
import { useWeatherStore } from "@/zustand/weatherStore";
import { useUserStore } from "@/zustand/store";
import { useWriteStore } from "@/zustand/writeStore";
import { addPostHandler, fieldChangeHandler } from "@/utils/postHandlers";
import { useRouter } from "next/navigation";
import FormLayout from "./(components)/WirteForm";
import { toast } from "react-toastify";

const Page = () => {
  // zustand 상태
  const { user } = useUserStore();
  const { weather, loading, setLocation } = useWeatherStore();
  const { formData, imageState, categoryInput, setFormData, setImageState, setCategoryInput, resetForm } =
    useWriteStore();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const lat = 37.5665;
    const lon = 126.978;
    const handleGetWeatherAndUser = () => {
      resetForm();
      if (weather.weather[0].main === "") {
        setLocation(lat, lon);
      }
      if (!loading && weather.coord.lat !== 0) {
        setFormData({
          temperature: weather.main.temp || 0,
          post_weather: weather.weather[0].main || "정보 없음"
        });
      }
    };
    handleGetWeatherAndUser();
  }, [weather, loading, setLocation, setFormData, resetForm]);

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.post_title.length === 0 || formData.post_title === "") {
      toast.warn("제목을 입력해주세요");
      return;
    } else if (formData.post_content.length === 0 || formData.post_content === "") {
      toast.warn("내용을 입력해주세요");
      return;
    } else if (formData.post_img.length === 0 || formData.post_img === "") {
      toast.warn("이미지를 업로드해주세요.");
      return;
    }
    setIsButtonDisabled(true);
    await addPostHandler(e, formData, imageState, user, resetForm);
    toast.success("작성이 완료되었습니다.");
    router.replace("/");
  };

  return (
    <FormLayout onSubmit={(e) => handleAddPost(e)}>
      <ImageUploader imageState={imageState} setImageState={setImageState} setFormData={setFormData} />
      <div>
        <div className="flex flex-row">
          <div className="flex flex-col gap-3 p-3">
            <InputField
              type="input"
              label="제목"
              name="post_title"
              value={formData.post_title}
              onChange={(e) => fieldChangeHandler(e, setFormData)}
              isDisabled={false}
            />
            <div className="flex flex-row gap-5">
              <InputField
                type="number"
                label="온도"
                name="temperature"
                value={formData.temperature}
                onChange={(e) => fieldChangeHandler(e, setFormData)}
                isDisabled={false}
              />
              <InputField
                type="select"
                label="날씨"
                name="post_weather"
                value={formData.post_weather}
                onChange={(e) => fieldChangeHandler(e, setFormData)}
                isDisabled={false}
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
        </div>
        <div className="flex flex-row-reverse p-3">
          <button
            type="submit"
            className="border p-2 px-10 bg-mainYellow text-mainText hover:bg-subOrange hover:text-white rounded"
            disabled={isButtonDisabled}
          >
            작성하기
          </button>
        </div>
      </div>
    </FormLayout>
  );
};

export default Page;
