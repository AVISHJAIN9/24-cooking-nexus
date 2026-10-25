# 05 - Kitchen Logistics

This module contains kitchen-level utilities: timer engine, grocery generator, portion scaler, and simple UI components for integration in the MERN app.

Structure:
- `core/` — business logic and controllers
- `data/` — lightweight repos and optional mongoose schemas
- `ui/` — React UI components
- `utils/` — shared helpers
- `tests/` — unit tests (simple assertions)

To use the Node services, require files under `core/`. UI components export default React components for client integration.
