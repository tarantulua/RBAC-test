## Description

This backend is the API service for the RBAC-test project. It provides:

- JWT authentication and session handling
- User, role, and permission CRUD operations
- `roles` and `users` endpoints with guards and decorators
- PostgreSQL persistence via TypeORM