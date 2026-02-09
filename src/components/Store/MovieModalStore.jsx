import { create } from "zustand";

export const useMovieModalStore = create((set) => ({
  modalState: false,
  setModalStateOpen: () => set({ modalState: true }),
  setModalStateclose: () => set({ modalState: false }),
}));
