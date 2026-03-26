import type { RoleName, UserPermissionsSlug } from "./user";

declare module "vue" {
  interface ComponentCustomProperties {
    $can: (role: RoleName | RoleName[]) => boolean;
    $hasPermission: (permission: UserPermissionsSlug) => boolean;
  }
}
