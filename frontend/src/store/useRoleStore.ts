import { defineStore } from "pinia";
import { useRolesApi } from "../api/useRolesApi";
import type { RoleStore } from "../types/store";

export const useRoleStore = defineStore("roles", {
  state: (): RoleStore => ({
    roles: [],
    uiFlags: {
      fetchRoles: {
        isLoading: false,
        error: null,
      },
      updateRolePermissions: {
        isLoading: false,
        error: null,
      },
    },
  }),
  getters: {},
  actions: {
    async fetchRoles() {
      const { fetchAllRoles } = useRolesApi();

      if (this.uiFlags.fetchRoles.isLoading) {
        return;
      }

      try {
        this.uiFlags.fetchRoles.isLoading = true;
        this.uiFlags.fetchRoles.error = null;

        const data = await fetchAllRoles();

        if (!data) {
          throw new Error("Failed to fetch roles.");
        }
        this.roles = data;
      } catch (error) {
        this.roles = [];
        this.uiFlags.fetchRoles.error =
          error instanceof Error ? error.message : "An unknown error occurred.";
      } finally {
        this.uiFlags.fetchRoles.isLoading = false;
      }
    },

    async updateRolePermissions(roleId: number, permissionIds: number[]) {
      const { updateRolePermissions } = useRolesApi();

      try {
        this.uiFlags.updateRolePermissions.isLoading = true;
        this.uiFlags.updateRolePermissions.error = null;

        const updatedRole = await updateRolePermissions(roleId, permissionIds);

        if (!updatedRole) {
          throw new Error("Failed to update role permissions.");
        }

        this.roles = this.roles.map((role) =>
          role.id === updatedRole.id ? updatedRole : role,
        );

        return true;
      } catch (error) {
        this.uiFlags.updateRolePermissions.error =
          error instanceof Error ? error.message : "An unknown error occurred.";
        return false;
      } finally {
        this.uiFlags.updateRolePermissions.isLoading = false;
      }
    },
  },
});
