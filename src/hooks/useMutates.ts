import { ImageType, WriteTypes } from "@/types/write";
import { addComment, deleteComment, deletePost, updatePost, uploadImage } from "@/utils/postApi";
import { UserData } from "@/zustand/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useUpdatePost = (postId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      postId,
      formData,
      imageState,
      user
    }: {
      postId: string;
      formData: Omit<WriteTypes, "fileInputRef">;
      imageState: ImageType;
      user: UserData;
    }) => {
      if (formData.post_title.length === 0 || formData.post_title === "") {
        throw new Error("제목을 입력해주세요");
      }
      if (formData.post_content.length === 0 || formData.post_content === "") {
        throw new Error("내용을 입력해주세요");
      }
      if (imageState.imageFile) {
        await uploadImage(imageState);
      }
      return updatePost(postId, {
        ...formData,
        post_date: new Date(),
        mem_no: user.userId
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      toast.success("업데이트가 완료 되었습니다.");
      router.replace(`/list/${postId}`);
    },
    onError: (error) => {
      console.log("글 수정 에러:", error);
      toast.warn(error.message);
    }
  });
};

export const useAddComment = (postId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: { comment_content: string }) =>
      addComment({
        post_id: postId,
        comment_content: comment.comment_content,
        mem_no: userId,
        comment_date: new Date().toISOString()
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", postId] });
      toast.success("댓글 작성이 완료 되었습니다..");
    },
    onError: (error) => {
      console.error("댓글 등록 에러 발생: ", error);
      toast.error("댓글 작성 에러가 발생했습니다.");
    }
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
      toast.success("게시글이 삭제 되었습니다.");
      router.replace("/list");
    },
    onError: (error) => {
      console.error("게시글 삭제 중 오류 발생:", error);
      toast.error("게시글 삭제 중 오류가 발생했습니다.");
    }
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      toast.success("댓글이 삭제 되었습니다.");
    },
    onError: (error) => {
      console.log("댓글 삭제 중 오류 발생:", error);
      toast.error("댓글 삭제 중 에러가 발생 했습니다.");
    }
  });
};
