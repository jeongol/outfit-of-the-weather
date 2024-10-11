import { post } from "@/types/post";
import supabase from "@/utils/supabase";

const MyPosts = async () => {
  const response = await supabase.from("post").select("*");
  const myPosts = response.data as post[];
  console.log(myPosts);
  return <div>내 게시물</div>;
};

export default MyPosts;
