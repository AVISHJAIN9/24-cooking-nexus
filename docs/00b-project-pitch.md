# Step 0b: Project Pitch & Executive Summary

This document provides rehearsable verbal pitches designed for technical interviews, hiring managers, and system architecture walkthroughs.

---

## 30-Second Elevator Pitch (Spoken First-Person)

"Cooking Nexus is a full-stack smart kitchen operating system and culinary video platform that solves the chaotic friction of cooking with messy hands while keeping the kitchen safe. I built an Express and MongoDB backend that ingests real-time computer vision frames to log safety hazards like unattended smoke or stove fires, paired with a React 18 single-page application featuring vertical recipe reels and synchronized multi-timers. For intelligence, instead of training an expensive custom model from scratch, I integrated Google's Gemini 3 Flash through a streaming edge gateway that delivers real-time recipe generation, conversational substitution advice, and automated web recipe parsing directly into structured JSON. It bridges real-time IoT appliance awareness, creator video monetization, and generative culinary AI into a single seamless experience."

---

## 2-Minute Deep Technical Pitch (Spoken First-Person)

"Whenever someone cooks at home, they hit three major roadblocks: their hands are coated in flour or oil so they can't touch their phone screen; they risk burning their food or starting a grease fire if they get distracted; and traditional recipe websites are cluttered with ads and static text that don't scale ingredients or sync with your kitchen timers.

To solve this, I engineered Cooking Nexus as a dual-tier full-stack system.

On the backend, I built a high-throughput Node.js and Express 5 ingestion service backed by MongoDB and Mongoose. It exposes a specialized computer vision telemetry endpoint at `/api/vision` that receives frame classification data from kitchen cameras and logs hazard events like smoke or flare-ups with timestamps into a `SafetyLog` collection. For authentication, I engineered a passwordless Magic Link system using signed 15-minute JSON Web Tokens, eliminating traditional password credential risks.

On the frontend, I developed a modern React 18 and TypeScript application bundled with Vite. It includes over 30 interactive routes covering a TikTok-style vertical culinary reel player with swipe navigation, an interactive portion scaler that recalculates ingredient measurements dynamically, multi-stage parallel kitchen timers, and a weekly meal planning board that compiles a consolidated grocery shopping list organized by supermarket aisle.

For intelligence, I integrated Google's Gemini 3 Flash model via a Deno-based edge proxy using Server-Sent Events. The client in `ai-stream.ts` decodes incoming token chunks in real time, giving users zero perceived latency when chatting with the AI Chef. I also engineered specialized prompt guardrails: a 'ghost chef' persona for side-by-side culinary technique comparisons, and an 'import' mode that extracts raw, messy web recipe text into strict, validated JSON with cooking times and ingredient arrays.

What I'm proudest of is the architectural separation: the backend handles fast, decoupled hazard ingestion and authentication, while the edge functions isolate the streaming AI inference, ensuring that heavy LLM traffic never blocks safety-critical kitchen telemetry."

---

## 10-Second Executive Hook
"A smart kitchen platform combining real-time vision safety alerts, vertical recipe reels, and streaming Gemini-powered culinary intelligence for hands-free home cooking."
