import { apiClient } from "./apiClient";
import type { UserPermission } from "../types/user";

const BASE_URL = "/api/permissions";

export const usePermissionsApi = () => {
  const fetchAllPermissions = async (): Promise<UserPermission[] | null> => {
    try {
      const { data } = await apiClient.get<UserPermission[]>(BASE_URL);
      return data;
    } catch (error) {
      return null;
    }
  };

  return {
    fetchAllPermissions,
  };
};
