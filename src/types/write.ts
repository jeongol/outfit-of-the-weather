export interface WriteTypes {
  mem_no: string;
  post_title: string;
  temperature: number;
  post_weather: string;
  post_content: string;
  post_category: string[];
  post_date: string;
  post_img: string;
  fileInputRef: HTMLInputElement | null;
}

export interface ImageType {
  prevImage: string;
  imageFile: File | null;
}

export interface PostTypes extends WriteTypes {
  post_id: string;
}
