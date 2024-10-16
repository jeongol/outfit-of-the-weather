"use client";
import React, { useEffect } from "react";
import ImageUploader from "./(components)/ImageUploader";
import Category from "./(components)/Category";
import InputField from "./(components)/InputField";
import { useWeatherStore } from "@/zustand/weatherStore";
import { useUserStore } from "@/zustand/store";
import { useWriteStore } from "@/zustand/writeStore";
import { addPostHandler, fieldChangeHandler } from "@/utils/postHandlers";
import { useRouter } from "next/navigation";
import FormLayout from "./(components)/WirteForm";

const Page = () => {
  // zustand 상태
  const { user } = useUserStore();
  const { weather, loading, setLocation } = useWeatherStore();
  const { formData, imageState, categoryInput, setFormData, setImageState, setCategoryInput } = useWriteStore();

  const router = useRouter();

  console.log(formData);
  useEffect(() => {
    const lat = 37.5665;
    const lon = 126.978;

    const handleGetWeatherAndUser = () => {
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
  }, [weather, loading, setLocation, setFormData]);

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    await addPostHandler(e, formData, imageState, user);
    alert("작성이 완료되었습니다.");
    router.replace("/");
    return;
  };

  return (
    <div className="m-0 p-3 bg-white">
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
            <button type="submit" className="border p-2 bg-blue-500 text-white hover:bg-blue-600 rounded">
              작성하기
            </button>
          </div>
        </div>
      </FormLayout>
    </div>
  );
};

export default Page;
