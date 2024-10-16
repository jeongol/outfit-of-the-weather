import { post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { useUserStore } from "@/zustand/store";

const ListCard = ({ post }: { post: post }) => {
  const userId = useUserStore((state) => state.user.userId);

  return (
    <>
      <div className="flex text-black">
        <Link
          href={`/list/${post.post_id}`}
          className="relative w-[300px] h-[400px] bg-slate-200 rounded-2xl overflow-hidden justify-center items-center"
        >
          <div className="relative w-full h-[330px]">
            <Image src={post.post_img} layout="fill" objectFit="cover" alt={post.post_title} />
          </div>
          <div className="absolute top-3 left-3 text-center text-white bg-black bg-opacity-70 rounded-lg p-3">
            <div>{post.temperature} °C</div>
            <div>{post.post_weather}</div>
          </div>
          <div className="p-3 pl-5">
            <div className="text-[14px] text-gray-500">{post.post_date}</div>
            <div className="text-[16px] font-bold">{post.post_title}</div>
          </div>
          {userId ? <LikeButton postId={post.post_id} /> : <></>}
        </Link>
      </div>
    </>
  );
};

export default ListCard;
