"use client";

import supabase from "@/utils/supabase/client";
import { useUserStore } from "@/zustand/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    console.log(data);
    if (data.user && data.user.email) {
      useUserStore.getState().loginUser({
        email: data.user.email,
        accessToken: data.session.access_token,
        userId: data.user.id,
        isAuthenticated: true
      });

      console.log("로그인이 완료되었습니다");
      toast.success("로그인 성공");
      router.replace("/");
    } else {
      console.error("Email이 존재하지 않습니다.");
      toast.error("로그인 실패");
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full py-28 justify-center items-center text-center">
      <h1 className="text-4xl font-bold">로그인</h1>

      <form className="flex flex-col p-10 bg-white rounded-xl" onSubmit={handleLogin}>
        <div className="flex flex-col mb-4">
          <label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="signInput"
              placeholder="이메일을 입력하세요"
            />
          </label>
        </div>
        <div className="flex flex-col mb-2">
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="signInput"
              placeholder="비밀번호를 입력하세요"
            />
          </label>
        </div>
        <button type="submit" className="bg-subOrange text-white p-3 pl-5 rounded-xl mt-5">
          로그인
        </button>
      </form>
      <div>
        <div>아직 회원이 아니신가요?</div>
        <Link className="text-subOrange font-semibold" href={"/signup"}>
          회원가입 하러가기 →
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
