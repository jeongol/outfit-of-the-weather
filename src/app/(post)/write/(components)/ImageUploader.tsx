import { ImageType, WriteTypes } from "@/types/write";
import React, { useRef } from "react";

interface Props {
  imageState: ImageType;
  setImageState: React.Dispatch<React.SetStateAction<ImageType>>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<WriteTypes, "fileInputRef">>>;
}

const ImageUploader = ({ imageState, setImageState, setFormData }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 관련 상태 업데이트
  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      setImageState({ imageFile: file, prevImage: preview });
      setFormData((prev) => ({
        ...prev,
        post_img: `https://tmqkkrunjxxrrlkjxkqq.supabase.co/storage/v1/object/public/post/post_${file.lastModified}`
      }));
    } else {
      setFormData((prev) => ({ ...prev, post_img: null }));
    }
  };

  // 미리보기 창 선택 시 이미지 업로더 선택
  const handlePreviewClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="border cursor-pointer" onClick={handlePreviewClick}>
      <div className="w-[200px] h-[full] rounded">
        {imageState.prevImage ? (
          <img className="w-full h-full object-cover" src={imageState.prevImage} alt="업로드 이미지" />
        ) : (
          <div className="m-0">사진을 추가하세요</div>
        )}
      </div>

      <input type="file" accept="image/*" multiple ref={fileInputRef} className="hidden" onChange={handleSetImage} />
    </div>
  );
};

export default ImageUploader;
