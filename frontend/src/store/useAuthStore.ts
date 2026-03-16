import { defineStore } from "pinia";
import type { AuthStore } from "../types/store";
import { useAuthApi } from "../api/useAuthApi";
import router from "../router";
import type { UserPermissionsSlug, RoleName } from "../types/user";

export const useAuthStore = defineStore("auth", {
  state: (): AuthStore => ({
    user: null,
    isInitialized: false,
    uiFlags: {
      login: {
        isLoading: false,
        error: null,
      },
      fetchMe: {
        isLoading: false,
        error: null,
      },
      logout: {
        isLoading: false,
        error: null,
      },
    },
  }),
  getters: {},
  actions: {
    async handleLogin(userId?: number) {
      const { fetchMe, login } = useAuthApi();
      const uiFlagKey = userId ? "login" : "fetchMe";

      try {
        this.uiFlags[uiFlagKey].isLoading = true;
        this.uiFlags[uiFlagKey].error = null;

        let data;

        if (userId != null) {
          data = await login(userId);
        } else {
          data = await fetchMe();
        }

        if (!data) {
          throw new Error("Failed to fetch user data.");
        }

        this.user = data;

        router.replace({ name: "dashboard" });
      } catch (error) {
        this.uiFlags[uiFlagKey].error =
          error instanceof Error ? error.message : "An unknown error occurred.";
      } finally {
        this.uiFlags[uiFlagKey].isLoading = false;
        this.isInitialized = true;
      }
    },

    async handleLogout() {
      const { logout } = useAuthApi();

      try {
        this.uiFlags.logout.isLoading = true;
        this.uiFlags.logout.error = null;

        await logout();
        this.user = null;
        router.replace({ name: "login" });
      } catch (error) {
        this.uiFlags.logout.error =
          error instanceof Error ? error.message : "Logout failed.";
      } finally {
        this.uiFlags.logout.isLoading = false;
      }
    },

    can(role: RoleName | RoleName[]): boolean {
      if (!this.user || typeof this.user.role == "number") {
        return false;
      }

      if (Array.isArray(role)) {
        return role.includes(this.user.role.name);
      }

      return this.user.role.name === role;
    },

    hasPermission(permission: UserPermissionsSlug): boolean {
      if (!this.user || typeof this.user.role == "number") {
        return false;
      }

      return this.user.role.permissions.some((userPermission) => {
        if (typeof userPermission === "number") {
          return false;
        }
        return userPermission.slug === permission;
      });
    },
  },
});
