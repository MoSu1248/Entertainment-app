import { create } from "zustand";

export const ThemeStore = create((set) => ({
  theme: "dark",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
//   setTheme: (newTheme) =>
//     set(() => ({
//       theme: newTheme,
//     })),
}));
