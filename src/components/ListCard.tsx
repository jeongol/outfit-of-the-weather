import { post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

const ListCard = ({ post }: { post: post }) => {
  return (
    <Link href={`/list/${post.post_id}`}>
      <Image src={post.post_img} width={100} height={100} className="" alt={post.post_title} />
      <p className="">{post.post_title}</p>
      <p className="">{post.post_date}</p>
    </Link>
  );
};

export default ListCard;
