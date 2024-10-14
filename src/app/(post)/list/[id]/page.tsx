import { getPost } from "@/utils/postApi";
import { WriteTypes } from "@/types/write";
import PostDetail from "./(components)/PostDetail";

type Props = {
  params: {
    id: string;
  };
};

const PostDetailPage = async ({ params }: Props) => {
  const { id } = params;

  const data: WriteTypes | null = await getPost(id);

  if (!data) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return <PostDetail data={data} />;
};

export default PostDetailPage;
