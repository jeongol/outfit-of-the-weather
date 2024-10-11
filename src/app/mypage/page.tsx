import MyLike from "@/components/MyLike";
import MyPosts from "@/components/MyPosts";

const page = async () => {
  return (
    <div>
      <MyPosts />
      <MyLike />
    </div>
  );
};

export default page;
