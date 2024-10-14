import { WriteTypes } from "@/types/write";
import React from "react";

interface Props {
  categoryInput: string;
  setCategoryInput: React.Dispatch<React.SetStateAction<string>>;
  formData: Omit<WriteTypes, "fileInputRef">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<WriteTypes, "fileInputRef">>>;
}

const Category = ({ categoryInput, setCategoryInput, formData, setFormData }: Props) => {
  // 해시태그 추가
  const handleCategoryAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (categoryInput.length === 0 || categoryInput.trim() === "") {
        setCategoryInput("");
        return alert("빈 태그는 입력할 수 없습니다.");
      }
      setFormData((prev) => ({
        ...prev,
        post_category: [...prev.post_category, categoryInput.trim()]
      }));
      setCategoryInput("");
    }
  };

  // 해시태그 삭제
  const handleRemoveTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      post_category: prev.post_category.filter((_, i) => i !== index)
    }));
  };
  return (
    <div className="flex flex-col">
      <span>태그</span>
      <div className="flex flex-row gap-2">
        <div className="flex flex-wrap gap-2">
          {formData.post_category.map((tag, index) => (
            <div key={index} className="flex items-center space-x-1 bg-gray-200 gap-2 p-1 rounded">
              <span>{tag}</span>
              <button type="button" onClick={() => handleRemoveTag(index)}>
                x
              </button>
            </div>
          ))}
        </div>
        <input
          placeholder="태그 입력 후 엔터"
          className="border w-[140px] text-center"
          name="post_category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          onKeyDown={handleCategoryAdd}
        />
      </div>
    </div>
  );
};

export default Category;
