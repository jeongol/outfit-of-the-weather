"use client";
import { signOut } from "@/utils/supabase/supabaseApi";
import { useUserStore } from "@/zustand/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const { user, logoutUser } = useUserStore();
  const router = useRouter();
  const nowPage = usePathname();

  const handleLogout = async () => {
    if (user.isAuthenticated) {
      await signOut();
      logoutUser();
      console.log("로그아웃 되었습니다.");
      if (nowPage === "/mypage") {
        router.replace("/login");
      }
    }
  };

  const selectPage = "text-2xl font-bold border-solid border-b-4 border-black p-1";
  const unSelectPage = "text-2xl font-bold";

  return (
    <div className="flex flex-row fixed gap-10 w-full h-20 p-5 space-x-52 justify-center items-center bg-slate-300">
      <Link className={nowPage === "/" ? selectPage : unSelectPage} href={"/"}>
        홈
      </Link>
      <Link className={nowPage === "/list" ? selectPage : unSelectPage} href={"/list"}>
        코디리스트
      </Link>
      {user.isAuthenticated ? (
        <>
          <Link className={nowPage === "/mypage" ? selectPage : unSelectPage} href={"/mypage"} prefetch={false}>
            마이페이지
          </Link>
          <button className="text-2xl font-bold text-gray-500 hover:text-black" onClick={handleLogout}>
            로그아웃
          </button>
        </>
      ) : (
        <Link className={nowPage === "/login" ? selectPage : unSelectPage} href={"/login"}>
          로그인
        </Link>
      )}
    </div>
  );
};

export default Header;
