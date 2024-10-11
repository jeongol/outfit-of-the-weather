import supabase from "@/utils/supabase";

const page = async () => {
  const { data: myPosts } = await supabase.from("post").select("*");
  console.log(myPosts);
  return <div>페이지</div>;
};

export default page;
