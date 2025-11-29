import React, { useState, createContext } from "react";
import { create } from "zustand";

export const useSearchStore = create((set) => ({
  searchTerm: "",
  setSearchTerm: (value) => set({ searchTerm: value }),
}));
