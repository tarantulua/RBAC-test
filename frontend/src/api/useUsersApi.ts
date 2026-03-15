import { apiClient } from "./apiClient";

export const useUsersApi = () => {
  const fetchUsers = async () => {
    try {
      const { data } = await apiClient.get("/api/users");
      return data;
    } catch (err) {}
  };

  return {
    fetchUsers,
  };
};
