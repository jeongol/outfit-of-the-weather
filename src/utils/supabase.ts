import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => createBrowserClient(process.env.SUPABASE_API_URL!, process.env.SUPABASE_API_KEY!);

const supabase = createClient();

export default supabase;
