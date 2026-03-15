import type { User } from "../types/user";
import { apiClient } from "./apiClient";

const BASE_URL = "/api/users";

export const useUsersApi = () => {
  const fetchUsers = async () => {
    try {
      const { data } = await apiClient.get<User[]>(BASE_URL);
      return data;
    } catch (err) {
      return null;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await apiClient.delete(`${BASE_URL}/${id}`);
      return true;
    } catch {
      return false;
    }
  };

  return {
    fetchUsers,
    deleteUser,
  };
};
