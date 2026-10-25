# Step 1: Project Map & Codebase Anatomy

This document maps the complete file structure, runtime dependencies, environment configurations, and entry points of the Cooking Nexus codebase.

---

## 1.1 Complete Folder Hierarchy

```
26-cooking-nexus/
├── server.js                        # Node.js Express server entrypoint (Vision telemetry listener on port 5000)
├── package.json                     # Root backend package configuration and scripts (Express 5, Mongoose 8)
├── package-lock.json                # Root dependency lockfile
├── .env                             # Environment configuration (PORT, MONGO_URI, JWT_SECRET)
│
├── config/                          # Infrastructure & database connectivity
│   └── db.js                        # MongoDB Mongoose connection configuration [Scaffolded]
│
├── controllers/                     # Ingestion and business orchestration handlers
│   ├── authController.js            # Magic Link JWT generation (15m expiry) and token verification logic
│   ├── memberController.js          # Member profile lookup and sensitive field filtering
│   └── safetyController.js          # Ingests optical hazard telemetry and dispatches to visionService
│
├── models/                          # Mongoose ODM schema definitions
│   ├── User.js                      # Authentication identity schema (email, unique index, lastLogin)
│   ├── Member.js                    # User profile preferences schema (theme, timestamps)
│   └── SafetyLog.js                 # Kitchen incident record schema (hazard type, severity level, timestamps)
│
├── routes/                          # Express REST API routing declarations
│   ├── authRoutes.js                # Mounts POST /login (magic link) and GET /verify
│   └── memberRoutes.js              # Mounts GET /:id profile retrieval
│
├── services/                        # Decoupled business logic domain services
│   ├── memberService.js             # Queries Member collection with password field omission
│   └── visionService.js             # Analyzes vision payload and writes SafetyLog document
│
├── middleware/                      # HTTP request interception pipeline
│   ├── authMiddleware.js            # JWT Bearer token authentication gatekeeper [Scaffolded]
│   └── errorMiddleware.js           # Centralized HTTP error handling middleware [Scaffolded]
│
├── docs/                            # Vue.js-style VitePress technical documentation
│   ├── .vitepress/                  # VitePress engine configuration, theme overrides, and Mermaid plugin
│   ├── features/                    # Individual feature deep-dives (F1 through F5)
│   ├── system-design/               # Enterprise distributed system design modules (14.1 - 14.17 + decisions)
│   └── ...                          # Master checklist, interview Q&A, tech comparisons, glossary
│
└── 27-kitchen-companion-pro/        # Interactive React 18 & TypeScript frontend application
    ├── package.json                 # Frontend dependencies (React 18.3.1, Vite 5.4.19, TailwindCSS, Radix)
    ├── vite.config.ts               # Vite bundler configuration with path aliases (@/ -> src/)
    ├── vitest.config.ts             # Vitest unit and component testing configuration
    ├── index.html                   # HTML5 single-page application mounting root
    ├── src/
    │   ├── main.tsx                 # React DOM root initialization with StrictMode
    │   ├── App.tsx                  # BrowserRouter, QueryClientProvider, and 31 route declarations
    │   ├── App.css / index.css      # Core Tailwind CSS design tokens and theme variables
    │   ├── lib/
    │   │   ├── ai-stream.ts         # Asynchronous SSE stream consumer for Lovable/Gemini 3 Flash
    │   │   └── utils.ts             # Class concatenation helper combining clsx and tailwind-merge
    │   ├── contexts/
    │   │   └── AuthContext.tsx      # Global authentication provider with local session persistence
    │   ├── data/
    │   │   └── recipes.ts           # Curated seed recipes with ingredients, cook times, and nutrition
    │   ├── components/              # Domain-specific UI assemblies
    │   │   ├── AppLayout.tsx        # Responsive desktop sidebar and mobile bottom navigation wrapper
    │   │   ├── ProtectedRoute.tsx   # Auth guard redirecting unauthenticated users to /login
    │   │   ├── Header.tsx           # Global brand header with search and user quick-menu
    │   │   ├── HeroSection.tsx      # Landing page animated hero with CTA banners
    │   │   ├── ReelsSection.tsx     # Trending reel preview cards with view counts
    │   │   └── ui/                  # 43 accessible Radix UI primitive components styled with Tailwind
    │   └── pages/                   # 31 routed full-page views
    │       ├── Index.tsx            # Public landing discovery page
    │       ├── Login.tsx            # Passwordless magic link and credentials login
    │       ├── ReelsFeed.tsx        # Full-height vertical culinary reel player with swipe mechanics
    │       ├── RecipeDetail.tsx     # Dynamic portion scaling, ingredient checklist, and nutrition breakdown
    │       ├── AIKitchen.tsx        # Interactive generative chef assistant
    │       ├── GhostChefComparison.tsx # Side-by-side culinary technique comparison view
    │       ├── MealPlannerPage.tsx  # Weekly calendar meal scheduling grid
    │       ├── TimerPage.tsx        # Multi-stage parallel kitchen countdown timers
    │       ├── ShoppingListPage.tsx # Consolidated grocery checklist categorized by grocery aisle
    │       └── ...                  # Kitchen IoT, Live stream, Journal, Nutrition, and Settings views
    └── supabase/
        └── functions/
            └── chef-ai/
                └── index.ts         # Deno Edge Function proxying Gemini 3 Flash with SSE streaming
```

---

## 1.2 Tech Stack & Exact Versions

### Backend & Core Ingestion
- **Runtime**: Node.js v20.x+
- **HTTP Framework**: Express `^5.2.1` ([package.json:L18](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/package.json#L18))
- **Database Driver / ODM**: Mongoose `^8.23.0` ([package.json:L19](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/package.json#L19))
- **Environment Management**: Dotenv `^17.3.1` ([package.json:L17](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/package.json#L17))

### Frontend Web Application (`27-kitchen-companion-pro`)
- **UI Library**: React `^18.3.1` & React DOM `^18.3.1`
- **Build Tooling / Bundler**: Vite `^5.4.19` with `@vitejs/plugin-react-swc ^3.11.0`
- **Language**: TypeScript `^5.8.3`
- **Routing**: React Router DOM `^6.30.1`
- **Server Cache & State**: TanStack React Query `^5.83.0`
- **Styling**: TailwindCSS `^3.4.17` with `tailwindcss-animate ^1.0.7` and `@tailwindcss/typography`
- **Component Primitives**: Radix UI suite (`@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-tabs`, etc.)
- **Icons**: Lucide React `^0.462.0`
- **Notifications**: Sonner `^1.7.4` & Radix Toast `^1.2.14`
- **Charts & Telemetry**: Recharts `^2.15.4`
- **Form Validation**: React Hook Form `^7.61.1` with Zod `^3.25.76` and `@hookform/resolvers ^3.10.0`

### AI & Edge Ingestion
- **Edge Runtime**: Deno v1.28+ (via Supabase Edge Functions)
- **AI Model**: `google/gemini-3-flash-preview` accessed through Lovable AI Gateway
- **Transport**: HTTP POST with Server-Sent Events (`text/event-stream`)

---

## 1.3 Complete Dependency Inventory & Purpose

### Root Server Dependencies (`package.json`)
| Dependency | Version | Purpose & Rationale |
|---|---|---|
| `express` | `^5.2.1` | Minimalist web framework handling routing, middleware dispatch, and JSON request parsing. |
| `mongoose` | `^8.23.0` | Object Data Modeling (ODM) library providing schema enforcement, validation, and query builders for MongoDB. |
| `dotenv` | `^17.3.1` | Loads environment variables from `.env` file into `process.env`. |
| `vitepress` | `^1.6.3` | Static site generator powered by Vite and Vue for high-performance developer documentation. |
| `mermaid` | `^11.4.1` | Diagramming library rendering architecture, sequence, and entity-relationship diagrams in markdown. |
| `vitepress-plugin-mermaid`| `^2.0.17`| Integrates Mermaid rendering into the VitePress build pipeline. |

### Frontend Application Dependencies (`27-kitchen-companion-pro/package.json`)
| Dependency | Version | Purpose & Rationale |
|---|---|---|
| `react` & `react-dom` | `^18.3.1` | Declarative UI component library utilizing the Concurrent Mode Virtual DOM. |
| `react-router-dom` | `^6.30.1` | Declarative client-side routing and protected route navigation. |
| `@tanstack/react-query`| `^5.83.0`| Server-state synchronization, automatic caching, query invalidation, and background refetching. |
| `tailwindcss` | `^3.4.17` | Utility-first CSS framework enabling design consistency and zero runtime CSS overhead. |
| `@radix-ui/*` primitives | Various | Headless, accessible UI building blocks (Dialog, Dropdown, Tabs, Tooltip, AspectRatio). |
| `lucide-react` | `^0.462.0` | Crisp SVG icon set for culinary controls (timers, flames, knives, search). |
| `recharts` | `^2.15.4` | Composable charting library visualizing daily macronutrient and creator revenue metrics. |
| `zod` | `^3.25.76`| TypeScript-first schema declaration and runtime input validation. |
| `react-hook-form` | `^7.61.1` | High-performance, un-opinionated form state management minimizing re-renders. |
| `sonner` | `^1.7.4` | Opinionated toast notification library for timer alarms and social notifications. |

---

## 1.4 Environment Variables & Secrets Directory

| Variable Name | System Location | Required By | Issue Authority | Purpose |
|---|---|---|---|---|
| `PORT` | Root `.env:L1` | `server.js` | Operating System / Cloud Host | Port on which the Express vision server listens (Default: 5000). |
| `MONGO_URI` | Root `.env:L2` | `server.js`, `config/db.js` | MongoDB Atlas / Local MongoDB | Connection URI for the MongoDB replica set or standalone daemon. |
| `JWT_SECRET` | Root `.env:L3` | `controllers/authController.js` | DevOps / Developer | Symmetric cryptographic secret key used for HMAC signing of Magic Link tokens. |
| `LOVABLE_API_KEY` | Deno Environment | `supabase/functions/chef-ai/index.ts` | Lovable AI Platform | API key granting access to the Gemini 3 Flash completion gateway. |
| `VITE_SUPABASE_URL` | Frontend `.env` | `src/lib/ai-stream.ts`, `client.ts` | Supabase Cloud | Base HTTPS URL for the Supabase project hosting the Edge Functions. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Frontend `.env` | `src/lib/ai-stream.ts`, `client.ts` | Supabase Cloud | Anon/public API key for client-side authentication and RLS evaluation. |

---

## 1.5 System Entry Points

1. **Backend Server Entry Point**: [server.js](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/server.js#L1-L6)
   - Executed via `node server.js` or `npm start`. Initializes Express app, attaches JSON middleware, binds `/api/vision` route, and listens on port 5000.
2. **Frontend Application Entry Point**: [27-kitchen-companion-pro/src/main.tsx](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/27-kitchen-companion-pro/src/main.tsx)
   - Executed via `npm run dev` in `27-kitchen-companion-pro`. Mounts the root React DOM onto `document.getElementById("root")` with `React.StrictMode`.
3. **Edge AI Function Entry Point**: [27-kitchen-companion-pro/supabase/functions/chef-ai/index.ts](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/27-kitchen-companion-pro/supabase/functions/chef-ai/index.ts#L33-L90)
   - Executed via Deno HTTP server `serve(async (req) => ...)` handling CORS preflight (`OPTIONS`) and streaming POST inference requests.
4. **Documentation Site Entry Point**: [docs/index.md](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/docs/index.md) & [docs/.vitepress/config.mjs](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/docs/.vitepress/config.mjs)
   - Executed via `npm run docs:dev` or `npm run docs:build`.
