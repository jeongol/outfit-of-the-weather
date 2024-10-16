import { ImageType, WriteTypes } from "@/types/write";
import { addComment, deleteComment, deletePost, updatePost, uploadImage } from "@/utils/postApi";
import { UserData } from "@/zustand/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
      router.replace(`/list/${postId}`);
    },
    onError: (error) => {
      console.log("글 수정 에러:", error);
      alert(error.message);
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
    },
    onError: (error) => {
      console.error("댓글 등록 에러 발생: ", error);
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
      alert("삭제되었습니다.");
      router.replace("/list");
    },
    onError: (error) => {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    }
  });
};
