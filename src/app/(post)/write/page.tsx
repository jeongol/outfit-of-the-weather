"use client";
import { ImageType, WriteTypes } from "@/types/write";
import { addPost, uploadImage } from "@/utils/postApi";
import React, { useEffect, useState } from "react";
import ImageUploader from "./(components)/ImageUploader";
import Category from "./(components)/Category";
import InputField from "./(components)/InputField";
import { useWeatherStore } from "@/zustand/weatherStore";

const Page = () => {
  // 상태
  const { weather, loading, setLocation } = useWeatherStore();
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [formData, setFormData] = useState<Omit<WriteTypes, "fileInputRef">>({
    post_title: "",
    temperature: 0,
    post_weather: "",
    post_content: "",
    post_category: [],
    post_date: new Date(),
    post_img: null
  });
  const [imageState, setImageState] = useState<ImageType>({
    prevImage: "",
    imageFile: null
  });

  useEffect(() => {
    const lat = 37.5665;
    const lon = 126.978;

    const handleGetWeather = () => {
      if (weather.weather[0].main === "") {
        setLocation(lat, lon);
      }

      if (!loading && weather.coord.lat !== 0) {
        setFormData((prev) => ({
          ...prev,
          temperature: weather.main.temp || 0,
          post_weather: weather.weather[0].main || "정보 없음"
        }));
      }
    };
    handleGetWeather();
  }, [weather, loading, setLocation]);

  // 게시글 추가
  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (formData.post_title.length === 0 || formData.post_title === "") {
        return alert("제목을 입력해주세요");
      } else if (formData.post_content.length === 0 || formData.post_content === "") {
        return alert("내용을 입력해주세요");
      }

      if (imageState.imageFile) {
        await uploadImage(imageState);
      }

      const postData = {
        ...formData,
        post_date: new Date()
      };

      await addPost(postData);

      setFormData({
        post_title: "",
        temperature: 0,
        post_weather: "",
        post_content: "",
        post_category: [],
        post_date: new Date(),
        post_img: null
      });
      setImageState({
        prevImage: "",
        imageFile: null
      });
      setCategoryInput("");
    } catch (error) {
      console.log("글 작성 에러:", error);
    }
  };

  console.log(formData);
  // 폼 데이터 값 변경하는 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "post_category":
        const tagsArray = value.split("#").map((tag) => tag.trim());
        setFormData((prev) => ({ ...prev, [name]: tagsArray }));
        break;
      case "post_weather":
        setFormData((prev) => ({ ...prev, post_weather: e.target.value }));
        break;
      default:
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
    }
  };

  return (
    <div className="m-0">
      <h1>글 작성</h1>
      <form className="flex flex-row" onSubmit={(e) => handleAddPost(e)}>
        <ImageUploader imageState={imageState} setImageState={setImageState} setFormData={setFormData} />
        <div>
          <InputField type="input" label="제목" name="post_title" value={formData.post_title} onChange={handleChange} />
          <div className="flex flex-row">
            <InputField
              type="number"
              label="온도"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
            />
            <InputField
              type="select"
              label="날씨"
              name="post_weather"
              value={formData.post_weather}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <InputField
              type="textarea"
              label="내용"
              name="post_content"
              value={formData.post_content}
              onChange={handleChange}
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
