import { create } from "zustand";

export const useMovieModalStore = create((set) => ({
  modalState: false,
  modalId: "",
  modaltype: "",
  setModalStateOpen: () => set({ modalState: true }),
  setModalStateClose: () => set({ modalState: false }),
  setModalId: (value) => set({ modalId: value }),
  setModalType: (value) => set({ modaltype: value }),
}));
