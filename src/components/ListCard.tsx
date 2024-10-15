"use client";
import { post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { useUserStore } from "@/zustand/store";

const ListCard = ({ post }: { post: post }) => {
  const userId = useUserStore((state) => state.user.userId);

  return (
    <Link
      href={`/list/${post.post_id}`}
      className="flex flex-col relative p-6 justify-center items-center bg-slate-400 rounded-xl"
    >
      <Image src={post.post_img} width={300} height={300} className="" alt={post.post_title} />
      <p className="">{post.post_title}</p>
      <p className="">{post.post_date}</p>

      {userId ? <LikeButton postId={post.post_id} /> : <></>}
    </Link>
  );
};

export default ListCard;
