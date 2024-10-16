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

  const handleOpenMenu = async () => {
    if (user.userId === data.mem_no) {
      setModalOpen(true);
    } else {
      alert("작성자만 삭제 가능합니다.");
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
      alert("작성자만 수정 가능합니다.");
    }
  };

  return (
    <div className="m-auto">
      <Suspense fallback={<div className="text-gray-500">...데이터 읽어 오는 중</div>}>
        <div className="flex flex-row justify-between">
          <DateAndTime createDate={data.post_date} />
          <div className="flex flex-row w-300 h-300 items-center">
            <div className="flex flex-row items-center">
              <LikeButton postId={data.post_id} />
              <div className="w-[30px] h-[30px] bg-gray-300 rounded-full flex items-center justify-center">
                <Image
                  src="https://tmqkkrunjxxrrlkjxkqq.supabase.co/storage/v1/object/public/post/post_1725217634166"
                  width={30}
                  height={30}
                  alt="기본 프로필 이미지"
                  className="rounded"
                />
              </div>
              <p>{nickname}</p>
            </div>
            {/* 버튼 메뉴 및 모달  */}
            <div className="flex justify-end">
              <div className="relative">
                <button className="text-gray-600 hover:text-gray-800 p-2" onClick={() => setMenuOpen(!isMenuOpen)}>
                  ...
                </button>
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
        <div className="flex flex-row gap-2 mb-4">
          <p className="font-semibold">{data.temperature}°C</p>
          <p className="font-semibold">{data.post_weather}</p>
        </div>
        <div className="w-[600px]">
          {/*  */}
          <Image src={data.post_img} width={400} height={300} alt={data.post_title} />
        </div>
        <h2 className="text-xl font-bold">{data.post_title}</h2>
        <p className="text-gray-700 mb-4">{data.post_content}</p>
        <h3 className="text-lg font-semibold mb-2">연관 태그</h3>
        <ul className="flex flex-wrap gap-2">
          {data.post_category.length >= 1 ? (
            data.post_category.map((category) => (
              <li className="bg-gray-200 text-gray-700 p-2 rounded-full" key={category}>
                {category}
              </li>
            ))
          ) : (
            <>태그가 없습니다</>
          )}
        </ul>
      </Suspense>
    </div>
  );
};

export default PostDetail;
