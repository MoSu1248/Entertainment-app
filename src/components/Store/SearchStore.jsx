import { create } from "zustand";

export const useSearchStore = create((set) => ({
  searchTerm: "",
  results: [],
  setSearchTerm: (value) => set({ searchTerm: value }),
  setResults: (value) => set({ results: value }),
}));
