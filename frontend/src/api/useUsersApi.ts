import type { User, UserFormValue } from "../types/user";
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

  const createUser = async (userData: UserFormValue): Promise<User | null> => {
    try {
      const { role, ...other } = userData;

      const { data } = await apiClient.post<User>(BASE_URL, {
        ...other,
        roleId: role,
      });

      return data;
    } catch {
      return null;
    }
  };

  const updateUser = async (
    id: number,
    userData: UserFormValue,
  ): Promise<User | null> => {
    try {
      const { id: userId, role, ...other } = userData;

      const { data } = await apiClient.put<User>(
        `${BASE_URL}/${id ?? userId}`,
        {
          ...other,
          roleId: role,
        },
      );

      return data;
    } catch {
      return null;
    }
  };

  return {
    fetchUsers,
    createUser,
    deleteUser,
    updateUser,
  };
};
