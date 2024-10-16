"use server";
import { createClient } from "./server";

// 로그아웃 (supabase)
export async function signOut() {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      console.error("Sign out error:", err.message);
      return { success: false, message: err.message };
    } else {
      console.error("알 수 없는 에러", err);
      return { success: false, message: "알 수 없는 에러 발생" };
    }
  }
}
