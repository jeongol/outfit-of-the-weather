import { createClient } from "@supabase/supabase-js";

// 서버 전용 Supabase 클라이언트 생성
const supabaseServerClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase 프로젝트 URL
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Supabase 익명 키
);

export default supabaseServerClient;
