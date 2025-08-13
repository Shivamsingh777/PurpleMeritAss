import { create } from "zustand";

export const useAuth = create(set => ({
  token: localStorage.getItem("token"),
  setToken: (t) => { t ? localStorage.setItem("token", t) : localStorage.removeItem("token"); set({ token: t }); },
  logout: () => { localStorage.removeItem("token"); set({ token: null }); }
}));
