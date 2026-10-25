# 051 - Member Personalized Dashboard

Industrial-grade member dashboard module for Project Nexus. Provides personalized summary data, recommended recipes, and lightweight data access patterns.

Structure:
- `core/` — controllers and business services
- `data/` — mongoose schemas and repositories
- `routes/` — express routes for API
- `ui/` — React components for client integration
- `utils/` — small helpers
- `tests/` — unit/integration smoke tests

Usage (server): require the router from `routes/051-Member-Personalized-Dashboard.routes.js` and mount it under `/api/v1/dashboard`.
