export const RoleName = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
} as const;

export type RoleName = (typeof RoleName)[keyof typeof RoleName];

export const UserPermissionsSlug = {
  USERS_VIEW: "users:view",
  USERS_EDIT: "users:edit",
  USERS_DELETE: "users:delete",
} as const;

export type UserPermissionsSlug =
  (typeof UserPermissionsSlug)[keyof typeof UserPermissionsSlug];

export interface UserPermission {
  id: string;
  slug: UserPermissionsSlug;
  description: string;
}

export interface User {
  id: number;
  name: string;
  role: number | Role;
  email: string;
  status: string;
}

export interface Role {
  id: number;
  name: RoleName;
  permissions: number[] | UserPermission[];
}
