import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex gap-10">
      <Link href={"/"}>홈</Link>
      <Link href={"/list"}>코디리스트</Link>
      {<Link href={"/login"}>로그인</Link>}
      <Link href={"/mypage"}>마이페이지</Link>
    </div>
  );
};

export default Header;
