import { apiClient } from "./apiClient";
import type { Role } from "../types/user";

export const useRolesApi = () => {
  const fetchAllRoles = async (): Promise<Role[] | null> => {
    try {
      const { data } = await apiClient.get<Role[]>("/api/roles");
      return data;
    } catch (error) {
      return null;
    }
  };

  const updateRolePermissions = async (
    roleId: number,
    permissionIds: number[],
  ): Promise<Role | null> => {
    try {
      const { data } = await apiClient.put<Role>(`/api/roles/${roleId}`, {
        permissionIds,
      });

      return data;
    } catch (error) {
      return null;
    }
  };

  return {
    fetchAllRoles,
    updateRolePermissions,
  };
};
