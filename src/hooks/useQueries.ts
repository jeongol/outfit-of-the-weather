import { post } from "@/types/post";
import { getMemberInfo, getPost } from "@/utils/postApi";
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
