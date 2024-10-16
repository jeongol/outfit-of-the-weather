"use client";

import { useMemberInfo, usePostData } from "@/hooks/useQueries";
import PostDetail from "./(components)/PostDetail";

type Props = {
  params: {
    id: string;
  };
};

const PostDetailPage = ({ params }: Props) => {
  const { id } = params;

  const { data, isLoading } = usePostData(id);
  const { data: memberData } = useMemberInfo(id);

  if (isLoading) {
    return <>로딩중</>;
  }

  if (!data || !memberData) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  return <PostDetail data={data} nickname={memberData.member.mem_nickname} />;
};
export default PostDetailPage;
