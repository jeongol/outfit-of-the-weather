"use client";
import { signOut } from "@/utils/supabase/supabaseApi";
import { useUserStore } from "@/zustand/store";
import Image from "next/image";
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

  const selectPage = "text-[16px] font-bold border-solid border-b-2 border-subOrange p-1 text-subOrange";
  const unSelectPage = "text-[16px] font-bold border-solid border-b-2 border-transparent p-1 text-mainText";

  return (
    <div className="w-full h-25 border-b-2 border-b-mainGreen bg-mainGreen shadow-lg">
      <div className="flex flex-row w-[1280px] h-25 py-5 text-mainText mx-auto">
        <div className="flex items-center justify-center gap-10">
          {/* <div>Outfit Of The Weather</div> */}
          <Link href={"/"}>
            <Image src="/OOTW_logo.png" alt="Logo" width={120} height={100} />
          </Link>
          <Link className={nowPage === "/" ? selectPage : unSelectPage} href={"/"}>
            홈
          </Link>
          <Link className={nowPage === "/list" ? selectPage : unSelectPage} href={"/list"}>
            OOTW 리스트
          </Link>
        </div>

        <div className="flex flex-row gap-10 items-center ml-auto">
          {user.isAuthenticated ? (
            <>
              <Link className={nowPage === "/mypage" ? selectPage : unSelectPage} href={"/mypage"} prefetch={false}>
                마이페이지
              </Link>
              <button className="text-gray-500 text-[16px] font-bold hover:text-black" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <Link className={nowPage === "/login" ? selectPage : unSelectPage} href={"/login"}>
              로그인
            </Link>
          )}
          <Link
            href={"/write"}
            className="bg-mainYellow border border-mainGreen text-[16px] text-bold p-5 w-[200px] h-[48px] rounded-l shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-subOrange  hover:text-white flex items-center justify-center"
          >
            나의 OOTW 올리기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
