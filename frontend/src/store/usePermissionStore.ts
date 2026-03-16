import { defineStore } from "pinia";
import { usePermissionsApi } from "../api/usePermissionsApi";
import type { PermissionStore } from "../types/store";

export const usePermissionStore = defineStore("permissions", {
  state: (): PermissionStore => ({
    permissions: [],
    uiFlags: {
      fetchPermissions: {
        isLoading: false,
        error: null,
      },
    },
  }),
  getters: {},
  actions: {
    async fetchPermissions() {
      const { fetchAllPermissions } = usePermissionsApi();

      if (this.uiFlags.fetchPermissions.isLoading) {
        return;
      }

      try {
        this.uiFlags.fetchPermissions.isLoading = true;
        this.uiFlags.fetchPermissions.error = null;

        const data = await fetchAllPermissions();

        if (!data) {
          throw new Error("Failed to fetch permissions.");
        }

        this.permissions = data;
      } catch (error) {
        this.permissions = [];
        this.uiFlags.fetchPermissions.error =
          error instanceof Error ? error.message : "An unknown error occurred.";
      } finally {
        this.uiFlags.fetchPermissions.isLoading = false;
      }
    },
  },
});