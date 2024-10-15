import { WriteTypes } from "@/types/write";
import Image from "next/image";
import { Suspense } from "react";

type Props = {
  data: WriteTypes;
};

const PostDetail = ({ data }: Props) => {
  return (
    <Suspense fallback={<>...데이터 읽어 오는 중</>}>
      <div>
        <div>
          <p>{new Date(data.post_date).toLocaleDateString()}</p>
          <div className="flex flex-row gap-2">
            <p>{data.temperature}도</p>
            <p>{data.post_weather}</p>
          </div>
          <Image
            src={data.post_img || "/path/to/default/image.jpg"} // 기본 이미지 경로
            width={300}
            height={300}
            alt="상세보기 이미지"
            priority
          />
          <h1>{data.post_title}</h1>
          <p>{data.post_content}</p>
          <ul className="flex flex-row gap-2">
            {data.post_category.map((category) => (
              <li key={category}>#{category}</li>
            ))}
          </ul>
        </div>
      </div>
    </Suspense>
  );
};

export default PostDetail;
