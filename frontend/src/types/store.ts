import type { User } from "./user";

export interface AuthStore {
  user: User | null;
  isInitialized: boolean;
}
