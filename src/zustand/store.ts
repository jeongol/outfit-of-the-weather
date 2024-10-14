import { create } from "zustand";
import { persist } from "zustand/middleware";

// UserData 타입 정의
interface UserData {
  email: string;
  accessToken: string;
  userId: string;
  isAuthenticated: boolean;
}

// Zustand 스토어 타입 정의
interface UserState {
  user: UserData;
  loginUser: (data: UserData) => void;
  logoutUser: () => void;
}

// Zustand 스토어 생성
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        email: "",
        accessToken: "",
        userId: "",
        isAuthenticated: false
      },
      loginUser: (data: UserData) =>
        set(() => ({
          user: {
            email: data.email,
            accessToken: data.accessToken,
            userId: data.userId,
            isAuthenticated: data.isAuthenticated
          }
        })),
      logoutUser: () =>
        set(() => ({
          user: {
            email: "",
            accessToken: "",
            userId: "",
            isAuthenticated: false
          }
        }))
    }),
    {
      name: "userInfo"
    }
  )
);
