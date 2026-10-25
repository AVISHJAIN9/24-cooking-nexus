# Cooking Nexus: Complete Developer & Interview Documentation

Welcome to the technical documentation for **Cooking Nexus & Culinary Companion Pro**, formatted in the style of the official Vue.js documentation.

---

## Complete Reading Order

### Project Overview & Discovery
1. [00. Project Type Detection](./00-project-type.md) — Pre-check evidence matrix and detected stack profile.
2. [00a. Full Project Analysis](./00a-project-analysis.md) — Complete codebase trace, screens, connections, and inventory counts.
3. [00b. Project Pitch](./00b-project-pitch.md) — Rehearsable 30-second and 2-minute spoken pitches.
4. [00. Project Map & File Anatomy](./00-project-map.md) — Folder tree, dependencies, env vars, and entry points.

### Feature Specifications & Build Guide
5. [01. Feature Inventory](./01-features.md) — Master inventory of all 10 features with code references and diagrams.
   - [F1: AI Recipe Generator & Vision](./features/F1-ai-recipe-generator-vision.md)
   - [F2: Hands-Free Voice & Gesture](./features/F2-handsfree-voice-gesture-assistant.md)
   - [F3: Smart Kitchen IoT Telemetry](./features/F3-smart-kitchen-iot-telemetry.md)
   - [F4: Culinary Reel Engine](./features/F4-culinary-reel-social-stream.md)
   - [F5: Kitchen Safety Vision Guard](./features/F5-kitchen-safety-vision-guard.md)
6. [02. Step-by-Step Build Order](./02-build-order.md) — Rebuilding the platform from scratch line by line.
7. [03. Complete API Reference](./03-api-reference.md) — Endpoint specifications, SSE streams, request/response samples.
8. [04. Tech Choice Comparisons](./04-tech-comparisons.md) — Exhaustive trade-off tables for database, AI, framework, and tooling.

### Architecture, Security & AI Deep Dives
9. [05. System Architecture & Data Flow](./05-architecture.md) — Request lifecycles, ER diagrams, caching, and 100x bottlenecks.
10. [06. Security Audit & OWASP Top 10](./06-security.md) — Threat models, prompt injection defense, and privacy analysis.
11. [07. AI Integration Deep Dive](./07-ai-integration.md) — Gemini 3 Flash, stream decoding, and model economics.
12. [08. Engineering Quality & Operations](./08-quality-and-ops.md) — Testing pyramid, observability, and concurrency risks.

### Interview Preparation & Checklists
13. [09. Interview Questions & Answers (150+)](./09-interview-qa.md) — Comprehensive technical questions with code answers.
14. [10. Gaps, Production Hardening & Roadmap](./10-gaps-and-improvements.md) — Prioritized production improvements and 90-day plan.
15. [11. Technical Glossary](./11-glossary.md) — Definitions of all technical terms and protocols.
16. [12. Developer Confirmation List](./12-confirm-list.md) — Inventory of all `[CONFIRM WITH DEVELOPER]` items.
17. [13. Master Checklist (All 275 Items)](./13-master-checklist.md) — Complete 275-point enterprise software audit.
18. [14. Say It Out Loud Scripts](./14-say-it-out-loud.md) — All spoken interview scripts and rehearsal checklist.

### Enterprise System Design Modules
19. [System Design Index](./system-design/index.md) — High-level distributed systems architecture.
    - [14.1 Capacity Estimation](./system-design/14.1-requirements-and-estimation.md)
    - [14.2 Architecture Styles](./system-design/14.2-architecture-styles.md)
    - [14.3 Networking & Communication](./system-design/14.3-networking-and-communication.md)
    - [14.4 Load Balancing & Scaling](./system-design/14.4-load-balancing-and-scaling.md)
    - [14.5 Databases & Storage](./system-design/14.5-databases-and-storage.md)
    - [14.6 Caching Strategies](./system-design/14.6-caching.md)
    - [14.7 Messaging & Queues](./system-design/14.7-messaging-and-queues.md)
    - [14.8 Consistency & Concurrency](./system-design/14.8-consistency-and-concurrency.md)
    - [14.9 Reliability & Resilience](./system-design/14.9-reliability-and-resilience.md)
    - [14.10 API Design & Rate Limiting](./system-design/14.10-api-design-and-rate-limiting.md)
    - [14.11 Security Architecture](./system-design/14.11-security-architecture.md)
    - [14.12 Search & AI Architecture](./system-design/14.12-search-and-ai-architecture.md)
    - [14.13 Real-Time Systems](./system-design/14.13-real-time-systems.md)
    - [14.14 Observability & Operations](./system-design/14.14-observability-and-operations.md)
    - [14.15 Performance Engineering](./system-design/14.15-performance-engineering.md)
    - [14.16 Cost & Cloud Economics](./system-design/14.16-cost-and-trade-offs.md)
    - [14.17 Classic System Design Problems](./system-design/14.17-classic-system-design.md)
    - [Architecture Decision Records (ADR)](./system-design/decisions.md)

---

## Running the Documentation Locally

```bash
# Run VitePress development server
npm run docs:dev

# Build production documentation bundle
npm run docs:build

# Preview production build
npm run docs:preview
```
