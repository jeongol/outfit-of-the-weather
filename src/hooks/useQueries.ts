import { CommentTypes } from "@/app/(post)/list/[id]/(components)/CommentList";
import { post } from "@/types/post";
import { getComment, getCommentNickname, getMemberInfo, getPost } from "@/utils/postApi";
import { useQuery } from "@tanstack/react-query";

export const usePostData = (id: string) => {
  return useQuery<post, Error>({
    queryKey: ["post", id],
    queryFn: () => getPost(id)
  });
};

export const useMemberInfo = (id: string) => {
  return useQuery<{ member: { mem_nickname: string } }, Error>({
    queryKey: ["member", id],
    queryFn: () => getMemberInfo(id)
  });
};

export const useCommentData = (postId: string) => {
  return useQuery<CommentTypes[], Error>({
    queryKey: ["comment", postId],
    queryFn: () => getComment(postId)
  });
};

export const useCommentNickname = (memNo: string) => {
  return useQuery({
    queryKey: ["comment", memNo],
    queryFn: () => getCommentNickname(memNo)
  });
};
