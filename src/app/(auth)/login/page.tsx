"use client";

import supabase from "@/utils/supabase/client";
import { useUserStore } from "@/zustand/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // const supabase = createClient();

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

      router.push("/");
    } else {
      console.error("Email이 존재하지 않습니다.");
    }
  };

  return (
    <div>
      <h1>로그인</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>
            이메일:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-black"
            />
          </label>
        </div>
        <div>
          <label>
            비밀번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-black"
            />
          </label>
        </div>
        <button type="submit">로그인</button>
      </form>
      <div>
        <div>아직 회원이 아니신가요?</div>
        <Link href={"/signup"}>회원가입 하러가기</Link>
      </div>
    </div>
  );
};

export default LoginPage;
