import { create } from "zustand";

const useWeatherStore = create((set) => ({
  wdata: null,
  forecastData: null,
  locationData: null,
  searchQuery: "",
  setWData: (data) => set({ wdata: data }),
  setForecastData: (data) => set({ forecastData: data }),
  setLocationData: (data) => set({ locationData: data }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useWeatherStore;
