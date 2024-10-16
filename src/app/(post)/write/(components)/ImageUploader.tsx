import { ImageType, WriteTypes } from "@/types/write";
import React, { useRef } from "react";
import { setImageHandler, triggerImageInputClick } from "@/utils/postHandlers";
import Image from "next/image";

interface Props {
  imageState: ImageType;
  setImageState: (data: ImageType) => void;
  setFormData: (data: Partial<WriteTypes>) => void;
}

const ImageUploader = ({ imageState, setImageState, setFormData }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border cursor-pointer" onClick={() => triggerImageInputClick(fileInputRef)}>
      <div className="w-[200px] h-[full] rounded">
        {imageState.prevImage ? (
          <Image src={imageState.prevImage} width={300} height={300} alt="업로드 이미지" />
        ) : (
          <div className="m-0">사진을 추가하세요</div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => setImageHandler(e, setImageState, setFormData)}
      />
    </div>
  );
};

export default ImageUploader;
