import { api } from "../../../lib/axios";

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const signup = async (data) => {
  const res = await api.post("/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
