import type { User } from "../types/user";

export const PRE_SEEDED_USERS: User[] = [
  {
    id: 1,
    name: "Admin User",
    role: 1,
    email: "admin@test.com",
    status: "active",
  },
  {
    id: 2,
    name: "Editor User",
    role: 2,
    email: "editor@test.com",
    status: "active",
  },
  {
    id: 3,
    name: "Viewer User",
    role: 3,
    email: "viewer@test.com",
    status: "active",
  },
];
