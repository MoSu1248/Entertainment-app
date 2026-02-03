import { create } from "zustand";

export const useOverlayStore = create((set) => ({
  overlayState: false,
  showLogout: () => set({ overlayState: true }),
  hideLogout: () => set({ overlayState: false }),
}));
