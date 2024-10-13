"use client";
import LikeButton from "@/components/LikeButton";
import MyLike from "@/components/MyLike";
import MyPosts from "@/components/MyPosts";
import { useState } from "react";

const Page = () => {
  const [select, setSelect] = useState<select>("myPosts");
  return (
    <div className="flex flex-col gap-10">
      <LikeButton />
      <div className="flex flex-row gap-10">
        <button onClick={() => setSelect("myPosts")}>My Posts</button>
        <button onClick={() => setSelect("myLikes")}>My Likes</button>
      </div>
      {select === "myPosts" ? <MyPosts /> : <MyLike />}
    </div>
  );
};

export default Page;

type select = "myPosts" | "myLikes";
