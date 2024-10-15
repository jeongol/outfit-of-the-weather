import { create } from "zustand";
import { getWeatherData } from "@/utils/weatherApi";
import { weatherData } from "@/types/weatherData";

interface WeatherState {
  lat: number | null;
  lon: number | null;
  weather: weatherData;
  loading: boolean;
  setLocation: (lat: number, lon: number) => void;
  fetchWeather: () => void;
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
  lat: null, //안씀
  lon: null, //안씀

  weather: {
    coord: {
      lon: 0,
      lat: 0
    },
    weather: [
      {
        id: 0,
        main: "",
        icon: ""
      }
    ],
    main: {
      temp: 0
    },
    name: ""
  },

  loading: false, // ->

  setLocation: (lat, lon) => {
    set({ lat, lon, loading: true });
    get().fetchWeather();
  },

  fetchWeather: async () => {
    const { lat, lon } = get();
    if (lat && lon) {
      const weatherData = await getWeatherData(lat, lon);
      set({
        weather: {
          coord: {
            lon: weatherData.coord.lon,
            lat: weatherData.coord.lat
          },
          weather: [
            {
              id: weatherData.weather[0].id,
              main: weatherData.weather[0].main,
              icon: weatherData.weather[0].icon
            }
          ],
          main: {
            temp: weatherData.main.temp
          },
          name: weatherData.name
        },
        loading: false
      });
    } else {
      set({ loading: false });
    }
  }
}));
