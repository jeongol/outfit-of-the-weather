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

  const selectPage = "text-[18px] font-bold border-solid border-b-2 border-blue-500 p-1 text-blue-500";
  const unSelectPage = "text-[18px] font-bold ";

  return (
    <div className="flex flex-row fixed gap-10 w-full h-20 p-5 bg-white text-[#333] max-w-[1280px] mx-auto">
      <div className="my-auto">
        <div>OOTW</div>
      </div>
      <div className="flex flex-row gap-10 items-center flex-grow">
        {" "}
        {/* 왼쪽 정렬을 위한 flex-grow 추가 */}
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
            <button className="text-gray-500 text-[18px] font-bold hover:text-black" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <Link className={nowPage === "/login" ? selectPage : unSelectPage} href={"/login"}>
            로그인
          </Link>
        )}
      </div>
      <div className="ml-auto">
        {" "}
        <Link
          href={"/write"}
          className="bg-gray-200 text-[16px] text-black p-5 w-[250px] h-[50px] rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-500 flex items-center justify-center"
        >
          나의 OOTW 올리기
        </Link>
      </div>
    </div>
  );
};

export default Header;
