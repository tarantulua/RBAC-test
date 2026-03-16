import type { UserPermissionsSlug, UserRole } from "./user";

declare module "vue" {
  interface ComponentCustomProperties {
    $can: (role: UserRole | UserRole[]) => boolean;
    $hasPermission: (permission: UserPermissionsSlug) => boolean;
  }
}
