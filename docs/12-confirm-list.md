# Step 12b: Developer Confirmation Checklist

This document compiles every architectural assumption and technical choice marked with `[CONFIRM WITH DEVELOPER]`. The developer can quickly review this list to verify or adjust decisions prior to technical interviews.

---

## Technical Assumptions to Verify

| # | Topic | Current Assumption in Documentation | Developer Verification Prompt | Status |
|---|---|---|---|---|
| **1** | **Database Selection** | MongoDB was chosen because recipe structures and kitchen telemetry logs are non-uniform documents with variable ingredient arrays and append-only hazard events. | *"Did you choose MongoDB primarily for document flexibility and rapid prototyping, or were there existing team skill constraints?"* | Pending Developer Confirmation |
| **2** | **AI Inference Provider** | Gemini 3 Flash via Lovable Gateway was selected over custom ML model training due to sub-250ms latency, high token economy, and zero infrastructure overhead. | *"Was Gemini 3 Flash selected primarily for latency and API pricing, or were multi-modal capabilities the primary decider?"* | Pending Developer Confirmation |
| **3** | **Passwordless Magic Links** | Magic link JWTs with 15-minute expiration were implemented to avoid managing password hashes and credential breaches. | *"Was passwordless authentication chosen to simplify mobile cook onboarding, or is OAuth (Google/Apple) planned as the primary sign-in?"* | Pending Developer Confirmation |
| **4** | **Frontend Architecture** | React 18 with Vite was selected over Next.js to build a client-heavy single-page application with offline audio timers and mobile PWA features. | *"Was client-side SPA routing preferred over Next.js SSR to ensure offline reliability and faster gesture response in the kitchen?"* | Pending Developer Confirmation |
| **5** | **Edge Function Runtime** | Supabase Edge Functions with Deno were utilized to isolate LLM streaming traffic from the core Express backend. | *"Is Deno/Supabase intended as the permanent edge layer, or will all routing eventually merge into an API Gateway?"* | Pending Developer Confirmation |
| **6** | **Kitchen Vision Telemetry** | Overhead camera frame processing is designed for local edge classification, sending only JSON hazard metadata (`Smoke Detected`) to the cloud. | *"Will the production camera stream raw video clips during an emergency, or strictly metadata to protect home privacy?"* | Pending Developer Confirmation |
