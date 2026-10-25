# Step 0 Pre-Check: Project Type Detection

## Detected Project Type
**Primary Type**: Full-Stack Distributed Culinary Intelligence Platform & Smart Kitchen IoT Ecosystem
**Stack Architecture**: Dual-Tier Hybrid Full-Stack:
1. **Core Backend & Ingestion Tier**: Node.js v20+ / Express v5.2.1 + MongoDB / Mongoose v8.23.0 + Computer Vision Safety Ingestion Engine + Magic Link JWT Auth (`server.js`, `controllers/`, `services/`, `models/`, `routes/`)
2. **Interactive Culinary Companion Frontend Tier**: React 18.3.1 + Vite 5.4.19 + TypeScript 5.8.3 + TailwindCSS 3.4.17 + Radix UI / Shadcn + TanStack React Query 5.83.0 (`27-kitchen-companion-pro/`)
3. **Edge AI & Streaming Tier**: Deno / Supabase Edge Functions (`27-kitchen-companion-pro/supabase/functions/chef-ai/index.ts`) calling `google/gemini-3-flash-preview` via Lovable AI Gateway using Server-Sent Events (SSE).
4. **IoT & Modular Appliance Subsystems**: Smart Oven telemetry, Fridge Vision tracking, Weight Scale sync, and Voice/Gesture hybrid navigation modules (`089-IoT-Smart-Oven/`, `090-IoT-Fridge-Telemetry/`, `092-IoT-Scale-Sync/`, `04-Voice-Gesture/`).

---

## Evidence Matrix

| Component | Detected File Evidence | Exact Dependency / Version | Functional Purpose |
|---|---|---|---|
| **Backend Server** | [server.js](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/server.js#L1-L6) | `express@^5.2.1` | REST HTTP listener on port 5000, JSON body parsing, safety vision telemetry route |
| **Database ODM** | [models/User.js](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/models/User.js#L1-L7), [models/Member.js](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/models/Member.js#L1-L9), [models/SafetyLog.js](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/models/SafetyLog.js#L1-L6) | `mongoose@^8.23.0` | MongoDB schemas for user authentication, member profile preferences, and kitchen hazard event logs |
| **Authentication Engine** | [controllers/authController.js](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/controllers/authController.js#L1-L32), [routes/authRoutes.js](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/routes/authRoutes.js#L1-L9) | `jsonwebtoken@^9.0.2` (via node), `nodemailer` | Passwordless Magic Link generation (15m expiry) and token verification controller |
| **Vision Safety Engine** | [controllers/safetyController.js](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/controllers/safetyController.js#L1-L10), [services/visionService.js](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/services/visionService.js#L1-L5) | Express POST `/api/vision` | Real-time kitchen hazard ingestion, smoke/fire classification, automated incident recording |
| **Frontend Web App** | [27-kitchen-companion-pro/package.json](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/27-kitchen-companion-pro/package.json#L54-L65), [27-kitchen-companion-pro/src/App.tsx](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/27-kitchen-companion-pro/src/App.tsx#L1-L106) | `react@^18.3.1`, `vite@^5.4.19`, `@tanstack/react-query@^5.83.0` | Single-page application featuring 30+ interactive routes, reels video player, meal planner, timer, and AI kitchen assistant |
| **AI Streaming Service** | [27-kitchen-companion-pro/supabase/functions/chef-ai/index.ts](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/27-kitchen-companion-pro/supabase/functions/chef-ai/index.ts#L33-L90), [27-kitchen-companion-pro/src/lib/ai-stream.ts](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/27-kitchen-companion-pro/src/lib/ai-stream.ts#L1-L98) | `google/gemini-3-flash-preview` via Lovable AI Gateway | Multi-mode LLM pipeline: Chat assistant, Ghost Chef theatrical recipe comparisons, and structured JSON recipe extraction |
| **IoT Telemetry Nodes** | [089-IoT-Smart-Oven/](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/089-IoT-Smart-Oven), [090-IoT-Fridge-Telemetry/](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/090-IoT-Fridge-Telemetry), [092-IoT-Scale-Sync/](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/092-IoT-Scale-Sync) | Node.js modular micro-services | Appliance sensor aggregation, oven temperature telemetry, inventory freshness tracking |

---

## Documentation Track Followed
This project follows the **Full-Stack MERN + Edge AI & IoT Appliance Ecosystem Track**:
- **Full-Stack Node.js/Express & MongoDB**: Every database query, model schema, API endpoint, middleware pipeline, and scaling challenge is documented with exact file references and line numbers.
- **Modern React 18 & TypeScript Single-Page Application**: Component hierarchy, hooks (`useState`, `useEffect`, `useCallback`, `useAuth`, `useToast`), client-side routing with `react-router-dom` v6, state caching with TanStack Query, and UI design systems (TailwindCSS + Radix UI primitives) are fully analyzed.
- **Production Pre-Trained AI Streaming Integration**: Real-world Server-Sent Events (SSE) streaming, prompt engineering (`chat`, `ghostchef`, `import`), structured JSON schema extraction, rate limit backpressure (HTTP 429), and credit exhaustion (HTTP 402) handling are rigorously broken down.
- **Real-Time IoT & Safety Interlocks**: Multi-device communication topologies, computer vision hazard classification, and edge-to-cloud telemetry sync.
