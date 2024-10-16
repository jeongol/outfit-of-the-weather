"use client";
import { signOut } from "@/utils/supabase/supabaseApi";
import { useUserStore } from "@/zustand/store";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user, logoutUser } = useUserStore();

  const handleLogout = () => {
    if (user.isAuthenticated) {
      logoutUser();
      signOut();
      console.log("로그아웃 되었습니다.");
    }
  };

  return (
    <div className="flex w-full justify-center bg-red-500">
      <div className="flex justify-center gap-40 w-[1280px] h-[100px] items-center">
        <Link href={"/"}>홈</Link>
        <Link href={"/list"}>코디리스트</Link>
        {user.isAuthenticated ? (
          <>
            <Link href={"/mypage"}>마이페이지</Link> <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <Link href={"/login"}>로그인</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
