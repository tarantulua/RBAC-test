import { apiClient } from "./apiClient";
import type { User } from "../types/user";

export const useAuthApi = () => {
  const fetchMe = async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get("/api/auth/me");
      return data;
    } catch (err) {
      return null;
    }
  };

  const login = async (userId: string): Promise<User | null> => {
    try {
      const { data } = await apiClient.post("/api/auth/select", { userId });
      return data;
    } catch (err) {
      return null;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("/api/auth/logout");
    } catch (err) {}
  };

  return {
    fetchMe,
    login,
    logout,
  };
};
