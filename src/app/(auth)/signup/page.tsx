"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: ""
  });

  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({
      email: "",
      password: "",
      passwordCheck: "",
      nickname: ""
    });

    let hasError = false;

    // 이메일 형식 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "유효한 이메일 주소를 입력해 주세요." }));
      hasError = true;
    }

    // 비밀번호 길이 유효성 검사
    if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: "비밀번호는 6자 이상이어야 합니다." }));
      hasError = true;
    }

    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (password !== passwordCheck) {
      setErrors((prev) => ({ ...prev, passwordCheck: "비밀번호가 일치하지 않습니다." }));
      hasError = true;
    }

    // 닉네임 길이 검사
    if (nickname.length < 2 || nickname.length > 10) {
      setErrors((prev) => ({ ...prev, nickname: "닉네임은 2자 이상, 10자 이하여야 합니다." }));
      hasError = true;
    }

    // 모든 필드가 유효한 경우에만 진행
    if (!hasError) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname
          }
        }
      });

      if (error) {
        console.error("회원가입 오류 => ", error.message);
        if (error.message.includes("invalid email")) {
          setErrors((prev) => ({ ...prev, email: "유효하지 않은 이메일 주소입니다." }));
        } else if (error.message.includes("already registered")) {
          setErrors((prev) => ({ ...prev, email: "이미 등록된 이메일입니다." }));
        } else {
          alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      } else {
        console.log("회원가입 성공!", data);
        alert("회원가입 성공!");
        await supabase.auth.signOut();
        router.push("/login");
      }
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full py-28 justify-center items-center">
      <h1 className="text-4xl font-bold">회원가입</h1>
      <form className="flex flex-col p-10 bg-white rounded-xl" onSubmit={handleSignUp}>
        {/* input 시작 */}
        <div className="flex flex-col mb-2">
          <label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signInput"
              placeholder="이메일을 입력하세요"
            />
          </label>
          {errors.email ? <p className="signInputError">{errors.email}</p> : <p className="signInputError"> </p>}
        </div>

        <div className="flex flex-col">
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signInput"
              placeholder="비밀번호를 입력하세요"
            />
          </label>
          {errors.password ? <p className="signInputError">{errors.password}</p> : <p className="signInputError"> </p>}

          <label>
            <input
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className="signInput"
              placeholder="비밀번호 확인"
            />
          </label>
          {errors.passwordCheck ? (
            <p className="signInputError">{errors.passwordCheck}</p>
          ) : (
            <p className="signInputError"> </p>
          )}
        </div>

        <div className="flex flex-col">
          <label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="signInput"
              placeholder="닉네임을 입력하세요"
            />
          </label>
          {errors.nickname ? <p className="signInputError">{errors.nickname}</p> : <p className="signInputError"> </p>}
        </div>
        <button type="submit" className="bg-blue-500 p-3 pl-5 rounded-xl mt-5">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
