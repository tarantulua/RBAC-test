import type { RoleName } from "./user";

export interface TableColumn<T> {
  label: string;
  key: keyof T | string;
  can?: RoleName[];
}
