import { create } from "zustand";
import { getWeatherData } from "@/utils/weatherApi";
import { weatherData } from "@/types/weatherData";

interface WeatherState {
  lat: number | null;
  lon: number | null;
  weather: weatherData | null;
  loading: boolean;
  setLocation: (lat: number, lon: number) => void;
  fetchWeather: () => void;
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
  lat: null,//안씀
  lon: null,//안씀
  weather: null, // -> 데이터 요청 받아서 리턴 값에 타입 지정하면 똑같고
  loading: false, // -> 각 페이지 구현 가능

  setLocation: (lat, lon) => {
    set({ lat, lon, loading: true });
    get().fetchWeather();
  },

  fetchWeather: async () => {
    const { lat, lon } = get();
    if (lat && lon) {
      const weatherData = await getWeatherData(lat, lon);
      set({ weather: weatherData, loading: false });
    } else {
      set({ loading: false });
    }
  }
}));
