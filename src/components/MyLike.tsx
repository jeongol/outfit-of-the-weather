import supabase from "@/utils/supabase";

const MyLike = async () => {
  const email = "ry0208@naver.com";
  const response = await supabase.from("member").select("*").eq("mem_id", email);
  const myLikes = response.data;
  // const ids = myLikes?.post_id
  console.log(myLikes);

  return <div>MyLike</div>;
};

export default MyLike;
