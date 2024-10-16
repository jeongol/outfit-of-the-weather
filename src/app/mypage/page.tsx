"use client";

import MyLike from "@/components/MyLike";
import MyPageHeader from "@/components/MyPageHeader";
import MyPosts from "@/components/MyPosts";
import { useUserStore } from "@/zustand/store";
import { Suspense, useState } from "react";

const Page = () => {
  const [date, setDate] = useState<number[]>([new Date().getFullYear(), new Date().getMonth() + 1]);
  const [select, setSelect] = useState<select>("myPosts");

  const userId = useUserStore((state) => state.user.userId);

  const selectCSS = "text-5xl";
  const unSelectCSS = "text-4xl text-gray-300";
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MyPageHeader date={date} />
      </Suspense>
      <div className="flex flex-col gap-10 m-10">
        <div>
          <div className="flex flex-row gap-10 mb-10">
            <button className={select === "myPosts" ? selectCSS : unSelectCSS} onClick={() => setSelect("myPosts")}>
              My Posts
            </button>
            <button className={select === "myLikes" ? selectCSS : unSelectCSS} onClick={() => setSelect("myLikes")}>
              My Likes
            </button>
          </div>
          <div className="flex flex-row gap-10 mx-10 justify-end">
            <select
              className="text-2xl"
              name="년"
              onChange={(e) => setDate((recent) => [Number(e.target.value), recent[1]])}
              defaultValue={date[0]}
            >
              {Array.from([2020, 2021, 2022, new Date().getFullYear() - 1, 2024]).map((n) => (
                <option key={n} value={n}>
                  {n}년
                </option>
              ))}
            </select>
            <select
              className="text-2xl"
              name="월"
              onChange={(e) => setDate((recent) => [recent[0], Number(e.target.value)])}
              defaultValue={date[1]}
            >
              {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).map((n) => (
                <option key={n} value={n}>
                  {n}월
                </option>
              ))}
            </select>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {select === "myPosts" ? <MyPosts date={date} userId={userId} /> : <MyLike date={date} userId={userId} />}
        </Suspense>
      </div>
    </>
  );
};

export default Page;

type select = "myPosts" | "myLikes";
