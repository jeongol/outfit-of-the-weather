"use client";

import { useMemberInfo, usePostData } from "@/hooks/useQueries";
import PostDetail from "./(components)/PostDetail";
import CommentForm from "./(components)/CommentForm";
import CommentList from "./(components)/CommentList";

export type Props = {
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

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-[1280px] m-auto pr-[100px] pl-[100px]">
      <PostDetail data={data} nickname={memberData.member.mem_nickname} />
      <CommentForm id={id} />
      <CommentList id={id} />
    </div>
  );
};
export default PostDetailPage;
