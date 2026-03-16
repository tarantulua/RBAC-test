import type { User } from "./user";
import type { Role } from "./user";
import type { UserPermission } from "./user";

export interface AsyncUiFlag {
  isLoading: boolean;
  error: string | null;
}

export interface AuthStore {
  user: User | null;
  isInitialized: boolean;
  uiFlags: {
    login: AsyncUiFlag;
    fetchMe: AsyncUiFlag;
    logout: AsyncUiFlag;
  };
}

export interface RoleStore {
  roles: Role[];
  uiFlags: {
    fetchRoles: AsyncUiFlag;
    updateRolePermissions: AsyncUiFlag;
  };
}

export interface UserStore {
  users: User[];
  uiFlags: {
    fetchUsers: AsyncUiFlag;
    createUser: AsyncUiFlag;
    updateUser: AsyncUiFlag;
    deleteUser: AsyncUiFlag;
  };
}

export interface PermissionStore {
  permissions: UserPermission[];
  uiFlags: {
    fetchPermissions: AsyncUiFlag;
  };
}
