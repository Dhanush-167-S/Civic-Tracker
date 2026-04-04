import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAdmin: false,
  isAuthenticated: false,

  setUser: (userData) => {
    set({
      user: userData,
      isAdmin: userData?.role === "admin",
      isAuthenticated: !!userData,
    });
  },

  clearUser: () => {
    set({
      userData: null,
      isAdmin: false,
      isAuthenticated: false,
    });
  },
}));
