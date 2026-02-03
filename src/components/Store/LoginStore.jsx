import { create } from "zustand";

export const useLoginStore = create((set) => ({
  user: null,

  login: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
  loadUser: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    } else {
      set({ user: null });
    }
  },
}));
