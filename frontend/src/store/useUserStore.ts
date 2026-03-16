import { defineStore } from "pinia";
import { useUsersApi } from "../api/useUsersApi";
import type { UserStore } from "../types/store";
import type { UserFormValue } from "../types/user";

export const useUserStore = defineStore("users", {
  state: (): UserStore => ({
    users: [],
    uiFlags: {
      fetchUsers: {
        isLoading: false,
        error: null,
      },
      createUser: {
        isLoading: false,
        error: null,
      },
      updateUser: {
        isLoading: false,
        error: null,
      },
      deleteUser: {
        isLoading: false,
        error: null,
      },
    },
  }),
  getters: {},
  actions: {
    async fetchUsers() {
      const { fetchUsers } = useUsersApi();

      if (this.uiFlags.fetchUsers.isLoading) {
        return;
      }

      try {
        this.uiFlags.fetchUsers.isLoading = true;
        this.uiFlags.fetchUsers.error = null;

        const data = await fetchUsers();

        if (!data) {
          throw new Error("Failed to fetch users.");
        }

        this.users = data;
      } catch (error) {
        this.users = [];
        this.uiFlags.fetchUsers.error =
          error instanceof Error ? error.message : "An unknown error occurred.";
      } finally {
        this.uiFlags.fetchUsers.isLoading = false;
      }
    },

    async createUser(userData: UserFormValue) {
      const { createUser } = useUsersApi();

      try {
        this.uiFlags.createUser.isLoading = true;
        this.uiFlags.createUser.error = null;

        const createdUser = await createUser(userData);

        if (!createdUser) {
          throw new Error("Failed to create user.");
        }

        await this.fetchUsers();

        return true;
      } catch (error) {
        this.uiFlags.createUser.error =
          error instanceof Error ? error.message : "An unknown error occurred.";
        return false;
      } finally {
        this.uiFlags.createUser.isLoading = false;
      }
    },

    async updateUser(id: number, userData: UserFormValue) {
      const { updateUser } = useUsersApi();

      try {
        this.uiFlags.updateUser.isLoading = true;
        this.uiFlags.updateUser.error = null;

        const updatedUser = await updateUser(id, userData);

        if (!updatedUser) {
          throw new Error("Failed to update user.");
        }

        this.users = this.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        );

        return true;
      } catch (error) {
        this.uiFlags.updateUser.error =
          error instanceof Error ? error.message : "An unknown error occurred.";
        return false;
      } finally {
        this.uiFlags.updateUser.isLoading = false;
      }
    },

    async deleteUser(id: number) {
      const { deleteUser } = useUsersApi();

      try {
        this.uiFlags.deleteUser.isLoading = true;
        this.uiFlags.deleteUser.error = null;

        const isDeleted = await deleteUser(id);

        if (!isDeleted) {
          throw new Error("Failed to delete user.");
        }

        this.users = this.users.filter((user) => user.id !== id);

        return true;
      } catch (error) {
        this.uiFlags.deleteUser.error =
          error instanceof Error ? error.message : "An unknown error occurred.";
        return false;
      } finally {
        this.uiFlags.deleteUser.isLoading = false;
      }
    },
  },
});
