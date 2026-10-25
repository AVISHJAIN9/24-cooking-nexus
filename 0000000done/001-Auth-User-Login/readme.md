Project Nexus: Industrial Backend Development (Block 001)
Q1: explain `sentimentMode: { type: Boolean, default: true }`

A: In Project Nexus, this is a Cognitive UI controller. It allows the backend to influence the user experience based on emotional or contextual data. It enables mood-based adaptation, state persistence across devices, and integration with sentiment analytics.

Q2: Is there a highlighter tool in VS Code for difficult parts?

A: While there is no native yellow marker, industrial teams use:

1. Todo Tree Extension: Use `// FIXME:` or `// TODO:` comments.

2. Text Marker Extension: For actual color-coding logic blocks.

3. Code Regions: Use `#region` and `#endregion` to fold and focus on specific logic.

Q3: Why use `static async` for methods?

A:

• Static: Belongs to the class itself, not an instance. This is memory-efficient for utility-based logic like authentication.

• Async: Non-blocking. It prevents the server from freezing while waiting for database lookups or password hashing.

Q4: Why check `!user` but not `!password` directly?

A: To prevent "Null Pointer" crashes. If `user` is null, trying to access `user.password` will crash the server. We check `!user` as a guard clause first. This also helps prevent timing attacks.

Q5: Why store `failedAttempts` in the database rather than the Service class?

A: Storing it on the Class would make it a global counter for all users. Storing it in the user's `securityMetadata` ensures we track attempts for each individual account. It also ensures the lockout status survives a server restart.

Q6: What are `standardHeaders` and `legacyHeaders` in rate limiting?

A:

• standardHeaders: true: Sends modern `RateLimit-*` headers to the client.

• legacyHeaders: false: Disables older, non-standard `X-RateLimit-*` headers to keep the API clean and secure.

Q7: Should routes be in a different folder?

A: No. In a modular "Block" architecture, keep the routes inside the feature folder (e.g., `001-Auth-User-Login/001-Auth-User-Login.routes.js`) to ensure the feature is self-contained and portable.

---

Technical Implementations Summary
• Schema: Includes `nexusId` slugs, `select: false` for passwords, and `securityMetadata`.

• Identity Service: Handles `bcrypt` comparison and `auditTrail` logging.

• Validator: Uses `express-validator` factories for "DRY" code.

• Controller: Orchestrates the Req/Res cycle.

• Middleware: Implements `express-rate-limit` for brute-force protection.