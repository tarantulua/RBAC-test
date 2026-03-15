import { defineStore } from "pinia";
import type { AuthStore } from "../types/store";
import { useAuthApi } from "../api/useAuthApi";
import router from "../router";
import type { UserPermissionsSlug, RoleName } from "../types/user";

export const useAuthStore = defineStore("auth", {
  state: (): AuthStore => ({
    user: null,
    isInitialized: false,
  }),
  getters: {},
  actions: {
    async handleLogin(userId?: string) {
      const { fetchMe, login } = useAuthApi();

      try {
        let data;

        if (userId) {
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
      } finally {
        this.isInitialized = true;
      }
    },

    async handleLogout() {
      const { logout } = useAuthApi();

      try {
        await logout();
        this.user = null;
        router.replace({ name: "login" });
      } catch (error) {
        console.error("Logout failed:", error);
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
