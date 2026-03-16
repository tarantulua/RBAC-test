# RBAC-test

A role-based access control (RBAC) demo app with NestJS backend and Vue.js frontend.

This repository implements:

- User authentication (JWT + roles)
- Permissions and roles management
- User and role management APIs
- Vue UI with login, dashboard, users and roles tables
- Docker compose for local dev with database seeding

## Quick start

1. Start all services:

```bash
docker compose up --build
```

2. Seed demo data:

```bash
docker exec -it auth_api pnpm run seed
```

3. Visit the frontend at `http://localhost:4000` (or configured port).

## Projects

- `backend/`: NestJS API, authentication, RBAC, PostgreSQL repository layer
- `frontend/`: Vue 3 + TypeScript UI with role and user management

## Future improvements

1. Restrict Editor possibility to update Admin users.

2. Make Permission take effect on real application (currently doing nothing).

3. Error handling
