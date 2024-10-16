import { useCommentNickname } from "@/hooks/useQueries";
import { CommentTypes } from "./CommentList";
import { useUserStore } from "@/zustand/store";
import { useDeleteComment } from "@/hooks/useMutates";
import { useState } from "react";
import Modal from "./Modal";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import { format } from "path";
import DateAndTime from "@/components/DateAndTime";

type CommentItemProps = {
  comment: CommentTypes;
};

const CommentItem = ({ comment }: CommentItemProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { user } = useUserStore();
  const { data: memberData, isLoading: isMemberLoading } = useCommentNickname(comment.mem_no);
  const findAuth = comment.mem_no === user.userId;

  const deleteCommentMutation = useDeleteComment();

  if (isMemberLoading) return <li>로딩중...</li>;

  const handleDelete = (confirm: boolean) => {
    if (confirm) {
      deleteCommentMutation.mutate(comment.comment_id); 
    } else {
      setModalOpen(false);
    }
  };

  const handleOpenModal = async () => {
    setModalOpen(true);
  };

  return (
    <li className="border-b py-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className="font-semibold">{memberData ? memberData.mem_nickname : "닉네임 없음"}</p>
          <p>{comment.comment_content}</p>
          <DateAndTime createDate={comment.comment_date} />
        </div>
        <div>
          {findAuth && (
            <button className="text-white bg-red-400 border-2 p-2 hover:bg-red-500  rounded" onClick={handleOpenModal}>
              삭제
            </button>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
        <p>정말로 이 댓글을 삭제하시겠습니까?</p>
        <div className="flex flex-row gap-2">
          <button onClick={() => handleDelete(true)} className="bg-red-100 text-red-500 border-2 p-2 hover:bg-red-200">
            삭제하기
          </button>
          <button onClick={() => handleDelete(false)} className="border-2 p-2 hover:bg-gray-200">
            취소하기
          </button>
        </div>
      </Modal>
    </li>
  );
};

export default CommentItem;
