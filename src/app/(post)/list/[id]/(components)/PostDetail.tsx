"use client";

import { useUserStore } from "@/zustand/store";
import Image from "next/image";
import { Suspense, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import MenuButton from "./MenuButton";
import { useWriteStore } from "@/zustand/writeStore";
import { post } from "@/types/post";
import { useDeletePost } from "@/hooks/useMutates";
import DateAndTime from "@/components/DateAndTime";
import { toast } from "react-toastify";
import LikeButton from "@/components/LikeButton";

type Props = {
  data: post;
  nickname: string;
};

const PostDetail = ({ data, nickname }: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUserStore();
  const { resetForm } = useWriteStore();
  const deletePostMutation = useDeletePost();

  const userId = useUserStore((state) => state.user.userId);

  const handleOpenMenu = async () => {
    if (user.userId === data.mem_no) {
      setModalOpen(true);
    } else {
      toast.warn("작성자만 삭제 가능합니다.");
    }
  };

  const handleDeletePost = (confirm: boolean) => {
    setModalOpen(false);
    if (confirm) {
      deletePostMutation.mutate(data.post_id);
    }
  };

  const handleEditPost = () => {
    if (user.userId === data.mem_no) {
      resetForm();
      router.replace(`/list/${data.post_id}/update`);
    } else {
      toast.warn("작성자만 수정 가능합니다.");
    }
  };

  return (
    <div className="m-auto">
      <Suspense fallback={<div className="text-gray-500">...데이터 읽어 오는 중</div>}>
        <div className="flex flex-row justify-between mt-4">
          <DateAndTime createDate={data.post_date} newDate={data.post_newdate} />
          <div className="flex flex-row w-300 h-300 items-center">
            <div className="flex flex-row items-center mr-4">
              <p>{nickname}</p>
            </div>
            {/* 버튼 메뉴 및 모달  */}
            <div className="flex justify-end">
              <div className="relative">
                <div
                  className="flex items-center text-gray-600 px-2 py-1 text-sm rounded hover:bg-slate-100 hover:text-gray-800 cursor-pointer"
                  onClick={() => setMenuOpen(!isMenuOpen)}
                >
                  <Image src="/images/more.png" alt="ads" width={20} height={20} />
                </div>

                <MenuButton onEdit={handleEditPost} onDelete={handleOpenMenu} isMenuOpen={isMenuOpen} />
                {/* 모달 */}
                <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
                  <p>정말로 이 포스트를 삭제하시겠습니까?</p>
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => handleDeletePost(true)}
                      className="bg-red-100 text-red-500 border-2 p-2 hover:bg-red-200"
                    >
                      삭제하기
                    </button>
                    <button onClick={() => handleDeletePost(false)} className="border-2 p-2 hover:bg-gray-200">
                      취소하기
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-4 mb-4">
          <p className="text-[20px] font-semibold">{data.temperature}°C</p>
          <p className="text-[20px] font-semibold">{data.post_weather}</p>
        </div>

        <div className="w-full flex justify-center mt-10 relative">
          <Image
            src={data.post_img}
            width={500}
            height={450}
            alt={data.post_title}
            className="block w-[420px] h-auto"
          />
        </div>

        {userId ? (
          <div className="flex justify-center mt-4">
            <LikeButton postId={data.post_id} />
          </div>
        ) : (
          <></>
        )}

        <h2 className="text-[30px] font-bold mt-10">{data.post_title}</h2>
        <p className="text-[20px] pl-1 text-gray-700 mb-12">{data.post_content}</p>
        <div className="flex flex-col mb-10">
          <h3 className="text-[12px] font-semibold mb-2 pl-1">연관 태그</h3>
          <ul className="flex flex-wrap gap-2">
            {data.post_category.length >= 1 &&
              data.post_category.map((category) => (
                <li className="text-[14px] bg-subOrange text-white px-4 py-1 rounded-full" key={category}>
                  {category}
                </li>
              ))}
          </ul>
        </div>
      </Suspense>
    </div>
  );
};

export default PostDetail;
