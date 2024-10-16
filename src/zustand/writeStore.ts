// store/writeStore.ts

import { formatDateTime } from "@/components/DateAndTime";
import { WriteTypes, ImageType } from "@/types/write";
import { create } from "zustand";

interface WriteState {
  formData: Omit<WriteTypes, "fileInputRef">;
  imageState: ImageType;
  categoryInput: string;
  setFormData: (data: Partial<WriteTypes>) => void;
  setImageState: (data: ImageType) => void;
  setCategoryInput: (input: string) => void;
  resetForm: () => void;
}

export const useWriteStore = create<WriteState>((set) => ({
  formData: {
    post_title: "",
    temperature: 0,
    post_weather: "",
    post_content: "",
    post_category: [],
    post_date: formatDateTime(new Date()),
    post_img: "",
    mem_no: ""
  },
  imageState: {
    prevImage: "",
    imageFile: null
  },
  categoryInput: "",

  // 상태를 업데이트하는 함수들
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data }
    })),

  setImageState: (data) => set(() => ({ imageState: data })),

  setCategoryInput: (input) => set(() => ({ categoryInput: input })),

  resetForm: () =>
    set(() => ({
      formData: {
        post_title: "",
        temperature: 0,
        post_weather: "",
        post_content: "",
        post_category: [],
        post_date: formatDateTime(new Date()),
        post_img: "",
        mem_no: ""
      },
      imageState: {
        prevImage: "",
        imageFile: null
      },
      categoryInput: ""
    }))
}));
