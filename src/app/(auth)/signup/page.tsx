"use client"; // 클라이언트 컴포넌트로 설정
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nickname: nickname
        }
      }
    });

    if (!email || !password || !passwordCheck || !nickname) return alert("빈 값이 없도록 해주세요");

    if (password !== passwordCheck) return alert("비밀번호가 일치하지 않습니다");

    if (error) {
      console.error("Error:", error.message);
    } else {
      console.log("회원가입 성공!", data);
      alert("회원가입 성공!");
      await supabase.auth.signOut();
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full py-28 justify-center items-center">
      <h1 className="text-4xl font-bold">회원가입</h1>
      <form className="flex flex-col p-10 gap-10 bg-slate-400 rounded-3xl" onSubmit={handleSignUp}>
        <div>
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
        <div className="flex flex-col gap-5">
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
              className="signInput"
              placeholder="비밀번호를 입력하세요"
            />
          </label>
          <label>
            <input
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              // required
              className="signInput"
              placeholder="비밀번호 확인"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              // required
              className="signInput"
              placeholder="닉네임을 입력하세요"
            />
          </label>
        </div>
        <button type="submit" className="bg-orange-200 p-2 rounded-2xl">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
