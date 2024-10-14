import PostDetail from "@/components/post/PostDetail";
import { getPost } from "@/utils/postApi";
import { WriteTypes } from "@/types/write";

type Props = {
  params: {
    id: string;
  };
};

export default async function PostDetailPage({ params }: Props) {
  const { id } = params;

  const data: WriteTypes | null = await getPost(id);

  if (!data) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return <PostDetail data={data} />;
}
