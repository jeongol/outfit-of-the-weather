"use client"; // 클라이언트 컴포넌트로 설정
import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

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
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={handleSignUp}>
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
              // required
              className="text-black"
            />
          </label>
          <label>
            비밀번호 확인:
            <input
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              // required
              className="text-black"
            />
          </label>
        </div>
        <div>
          <label>
            닉네임:
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              // required
              className="text-black"
            />
          </label>
        </div>
        <button type="submit">회원가입</button>
      </form>
    </>
  );
};

export default SignupPage;
