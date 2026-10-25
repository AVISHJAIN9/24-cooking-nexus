# Step 12: Technical Glossary

This glossary defines all key technical terms, protocols, and architectural concepts used throughout the Cooking Nexus platform.

---

### A
- **Adaptive Bitrate Streaming (ABR)**: A technique used in video delivery (such as HLS or DASH) where video quality adjusts dynamically based on the client's network bandwidth.
- **Atomic Operation**: A database write or modification that completes entirely or fails entirely, preventing race conditions during concurrent updates.

### B
- **BSON (Binary JSON)**: The binary-encoded serialization format used by MongoDB to store documents, supporting rich data types like Date and 64-bit integers.

### C
- **Change Data Capture (CDC)**: A software pattern that monitors database transaction logs (such as the MongoDB Oplog) to stream real-time change events into downstream systems like Kafka or Elasticsearch.
- **Concurrent Mode**: A set of features in React 18 enabling interruptible rendering, allowing background UI updates without freezing active user interactions.

### D
- **Deno**: A secure, modern JavaScript/TypeScript runtime built on the V8 engine and Rust, used for executing Supabase Edge Functions.

### G
- **GATT (Generic Attribute Profile)**: The Bluetooth Low Energy protocol defining how connected peripherals (like the Bluetooth Kitchen Scale in `092-IoT-Scale-Sync`) expose hierarchical services and characteristics.

### J
- **JWT (JSON Web Token)**: An open standard (RFC 7519) compact URL-safe format used for digitally signing claims (such as email identity and expiration) using an HMAC-SHA256 secret.

### M
- **Magic Link**: A passwordless authentication mechanism where the server sends a single-use, time-limited cryptographic token via email or link, verifying identity upon retrieval.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema enforcement, type casting, validation, and query middleware.

### O
- **Oplog (Operations Log)**: A capped collection in MongoDB that records a rolling history of all data modifications, enabling replica set synchronization and CDC pipelines.
- **Optimistic UI**: A frontend state pattern where the UI updates immediately upon user interaction (such as incrementing a like counter) before waiting for server confirmation.

### R
- **Radix UI**: A collection of unstyled, headless, accessible component primitives (Dialog, DropdownMenu, Tabs) that comply with WAI-ARIA standards.

### S
- **Server-Sent Events (SSE)**: A unidirectional HTTP streaming protocol (`text/event-stream`) allowing a server to push real-time text events to a browser over a single persistent connection.
- **Structured Outputs**: A technique in LLM engineering where a language model is constrained via strict grammar or system instructions to output only valid, parseable JSON matching a defined schema.

### T
- **Time to First Token (TTFT)**: The latency duration measured from when an HTTP request is dispatched to an AI model until the first token chunk arrives at the client reader.
- **Token Bucket Algorithm**: A rate limiting algorithm where tokens accumulate at a constant fill rate up to a bucket capacity, preventing traffic bursts from overwhelming downstream APIs.

### V
- **VitePress**: A static site generator built on top of Vite and Vue, designed for authoring fast, lightweight developer documentation sites.
