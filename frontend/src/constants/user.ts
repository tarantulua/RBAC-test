import type { User } from "../types/user";

export const PRE_SEEDED_USERS: User[] = [
  {
    id: 1,
    name: "Admin User",
    role: "admin",
    email: "admin@test.com",
    status: "active",
  },
  {
    id: 2,
    name: "Editor User",
    role: "editor",
    email: "editor@test.com",
    status: "active",
  },
  {
    id: 3,
    name: "Viewer User",
    role: "viewer",
    email: "viewer@test.com",
    status: "active",
  },
];
