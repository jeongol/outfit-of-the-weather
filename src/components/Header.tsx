"use client";
import { useUserStore } from "@/zustand/store";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user, logoutUser } = useUserStore();

  const handleLogout = () => {
    if (user.isAuthenticated) {
      logoutUser();
      console.log("로그아웃 되었습니다.");
    }
  };

  return (
    <div className="flex gap-10">
      <Link href={"/"}>홈</Link>
      <Link href={"/list"}>코디리스트</Link>
      <Link href={"/mypage"}>마이페이지</Link>
      {user.isAuthenticated ? <button onClick={handleLogout}>로그아웃</button> : <Link href={"/login"}>로그인</Link>}
    </div>
  );
};

export default Header;
