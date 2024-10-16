import React from "react";
import { addCategoryHandler, removeTagHandler } from "@/utils/postHandlers"; // 분리된 함수 import
import { WriteTypes } from "@/types/write";

interface Props {
  categoryInput: string;
  setCategoryInput: (input: string) => void;
  formData: Omit<WriteTypes, "fileInputRef">;
  setFormData: (data: Partial<WriteTypes>) => void;
}

const Category = ({ categoryInput, setCategoryInput, formData, setFormData }: Props) => {
  return (
    <div className="flex flex-col h-[100px]">
      <span>태그</span>
      <div className="flex flex-row gap-2">
        <div className="flex flex-wrap gap-2 w-[300px] h-[30px]">
          {formData.post_category.map((tag, index) => (
            <div key={index} className="flex items-center space-x-1 bg-gray-200 gap-2 p-1 rounded">
              <span>{tag}</span>
              <button type="button" onClick={() => removeTagHandler(index, formData, setFormData)}>
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
          onKeyDown={(e) => addCategoryHandler(e, categoryInput, setCategoryInput, formData, setFormData)}
        />
      </div>
    </div>
  );
};

export default Category;
