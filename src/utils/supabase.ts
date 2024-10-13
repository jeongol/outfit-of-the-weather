import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_API_URL!, process.env.NEXT_PUBLIC_SUPABASE_API_KEY!);

const supabase = createClient();

export default supabase;
