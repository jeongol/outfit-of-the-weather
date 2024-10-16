import React, { useState, FormEvent } from "react";
import { useAddComment } from "@/hooks/useMutates"; // 훅 가져오기
import { useUserStore } from "@/zustand/store";

type Props = {
  id: string;
};

const CommentForm = ({ id }: Props) => {
  const { user } = useUserStore();
  const [comment, setComment] = useState("");
  const mutation = useAddComment(id, user.userId);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      mutation.mutate({ comment_content: comment });
      setComment("");
    }
  };

  console.log(user);
  console.log(id);
  console.log(comment);
  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <textarea
        className="w-full p-2 border border-gray-300 rounded resize-none"
        placeholder="댓글을 입력하세요..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />
      <button
        type="submit"
        className="self-end p-2 bg-subOrange text-white rounded hover:bg-blue-600"
        disabled={mutation.isPending}
      >
        댓글 작성
      </button>
      {mutation.isError && <p className="text-red-500">댓글 작성에 실패했습니다.</p>}
    </form>
  );
};

export default CommentForm;
