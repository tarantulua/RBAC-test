import type { UserRole } from "./user";

export interface TableColumn<T> {
  label: string;
  key: keyof T | string;
  can?: UserRole[];
}