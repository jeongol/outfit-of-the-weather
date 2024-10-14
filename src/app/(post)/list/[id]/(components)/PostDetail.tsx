import { WriteTypes } from "@/types/write";

type Props = {
  data: WriteTypes;
};

const PostDetail = ({ data }: Props) => {
  return (
    <div>
      <div>
        <p>{new Date(data.post_date).toLocaleDateString()}</p>
        <div className="flex flex-row gap-2">
          <p>{data.temperature}도</p>
          <p>{data.post_weather}</p>
        </div>
        <h1>{data.post_title}</h1>
        <p>{data.post_content}</p>
        <ul className="flex flex-row gap-2">
          {data.post_category.map((category) => (
            <li key={category}>#{category}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetail;
