import { apiClient } from "./apiClient";

export const useRolesApi = () => {
  const fetchAllRoles = async () => {
    try {
      const { data } = await apiClient.get("/api/roles");
      return data;
    } catch (error) {}
  };

  return {
    fetchAllRoles,
  };
};
