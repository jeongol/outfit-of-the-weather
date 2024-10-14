import { create } from "zustand";
import { getWeatherData } from "@/utils/weatherApi";
import { weatherData } from "@/types/weatherData";  

interface WeatherState {
  lat: number | null;  
  lon: number | null;   
  weather: weatherData | null; 
  setLocation: (lat: number, lon: number) => void;  
  fetchWeather: () => void; 
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
  lat: null,
  lon: null,
  weather: null,


  setLocation: (lat, lon) => {
    set({ lat, lon });
    get().fetchWeather(); 
  },


  fetchWeather: async () => {
    const { lat, lon } = get();
    if (lat && lon) {
      try {
        const weatherData = await getWeatherData(lat, lon);
        set({ weather: weatherData });
      } catch (error) {
        console.error("날씨 데이터를 불러오는데 실패했습니다.", error);
      }
    }
  }
}));