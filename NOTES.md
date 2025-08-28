- Decisions & Rationale
Stack Selection:
Used React with Tailwind for modular, responsive UI and rapid styling. Picked Apollo Server for the mock GraphQL backend, matching common real-world stacks and specs.

- Schema & Sample Data:
Exactly mirrored the provided GraphQL schema and seeded with the supplied product data for consistency and clear testing of business logic.

- Componentization:
Broke down the UI into top bar, filters row, KPI cards, line chart, product table, and right drawer for clarity. Each is a reusable React component.

- Filtering & Pagination:
Live filters work in conjunction—search, warehouse, and status—to produce a seamless and dynamic view of inventory. Pagination ensures clarity even as data grows.

- Business Logic:
Status rules are strictly applied:

🟢 Healthy for stock > demand

🟡 Low for stock = demand

🔴 Critical for stock < demand (with red row highlight)
This makes inventory status immediately understandable.

- State Management:
Used React hooks for local state (filters, pagination, drawer controls), and Apollo hooks for data fetching and mutation, following best practices for clarity and separation.

- Trade-offs & Constraints
Rapid Iteration Over Polish:
Focused on feature delivery per spec, not on detailed performance optimization, accessibility, or advanced error handling.

- Basic Validation:
Backend and frontend forms have minimal validation. With more time, would add schema validation and user feedback on errors.

- Minimal Authentication:
Skipped access control and user system for brevity.

- Limited Testing:
Manually tested core scenarios, but did not include automated unit or integration tests.

- Improvements with More Time
Advanced Error Handling:
Robust handling and reporting for backend and frontend errors.

Authentication & Security:
User login, protected mutations, and rate limiting.

Extensive Automated Testing:
Unit, integration, and end-to-end tests to ensure reliability and catch regressions.

Performance Enhancements:
Optimize queries, add caching and lazy loading for large datasets.

UX/Accessibility Polish:
More responsive design, keyboard navigation, and a11y improvements.

- User Documentation:
Expanded README, user guides, and API docs.

- Feature Expansion:
Enhanced analytics (multi-warehouse views), CSV exports, dark mode, and notifications.

- Reflection
Delivered a clean, modular dashboard with precise business logic, responsive UI, and real GraphQL-backed interaction—all within the spec’s constraints and timeline. Code and decisions prioritize clarity, scalability, and direct correspondence with requirements.
