# 14. Say It Out Loud: Complete Interview Spoken Scripts

This master rehearsal document compiles every feature's verbatim first-person spoken script. Practice reciting these aloud until each feature can be explained fluidly and confidently without looking at notes.

---

## 1. Project Overview Pitches

### 30-Second Elevator Pitch
"Cooking Nexus is a full-stack smart kitchen operating system and culinary video platform that solves the chaotic friction of cooking with messy hands while keeping the kitchen safe. I built an Express and MongoDB backend that ingests real-time computer vision frames to log safety hazards like unattended smoke or stove fires, paired with a React 18 single-page application featuring vertical recipe reels and synchronized multi-timers. For intelligence, instead of training an expensive custom model from scratch, I integrated Google's Gemini 3 Flash through a streaming edge gateway that delivers real-time recipe generation, conversational substitution advice, and automated web recipe parsing directly into structured JSON. It bridges real-time IoT appliance awareness, creator video monetization, and generative culinary AI into a single seamless experience."

### 2-Minute Technical Pitch
"Whenever someone cooks at home, they hit three major roadblocks: their hands are coated in flour or oil so they can't touch their phone screen; they risk burning their food or starting a grease fire if they get distracted; and traditional recipe websites are cluttered with ads and static text that don't scale ingredients or sync with your kitchen timers.

To solve this, I engineered Cooking Nexus as a dual-tier full-stack system.

On the backend, I built a high-throughput Node.js and Express 5 ingestion service backed by MongoDB and Mongoose. It exposes a specialized computer vision telemetry endpoint at `/api/vision` that receives frame classification data from kitchen cameras and logs hazard events like smoke or flare-ups with timestamps into a `SafetyLog` collection. For authentication, I engineered a passwordless Magic Link system using signed 15-minute JSON Web Tokens, eliminating traditional password credential risks.

On the frontend, I developed a modern React 18 and TypeScript application bundled with Vite. It includes over 30 interactive routes covering a TikTok-style vertical culinary reel player with swipe navigation, an interactive portion scaler that recalculates ingredient measurements dynamically, multi-stage parallel kitchen timers, and a weekly meal planning board that compiles a consolidated grocery shopping list organized by supermarket aisle.

For intelligence, I integrated Google's Gemini 3 Flash model via a Deno-based edge proxy using Server-Sent Events. The client in `ai-stream.ts` decodes incoming token chunks in real time, giving users zero perceived latency when chatting with the AI Chef. I also engineered specialized prompt guardrails: a 'ghost chef' persona for side-by-side culinary technique comparisons, and an 'import' mode that extracts raw, messy web recipe text into strict, validated JSON with cooking times and ingredient arrays.

What I'm proudest of is the architectural separation: the backend handles fast, decoupled hazard ingestion and authentication, while the edge functions isolate the streaming AI inference, ensuring that heavy LLM traffic never blocks safety-critical kitchen telemetry."

---

## 2. Feature Scripts (Spoken First-Person)

### F1: AI Generative Chef & Structured Recipe Extraction (Core Feature — 18 Lines)
"I built the AI Chef Assistant to give users hands-free cooking guidance and to automatically convert messy recipe text from websites into clean, structured data. When a user asks a cooking question in `AiChatPage`, the frontend calls `streamChat` in `ai-stream.ts`, which opens a POST connection to our Deno edge function at `/functions/v1/chef-ai`. The edge function attaches a tailored system prompt and forwards the request to Google's Gemini 3 Flash model via the Lovable gateway with streaming enabled. As tokens arrive in Server-Sent Events, my client-side reader parses the JSON chunks using a `TextDecoder` and immediately streams the text into the React component, eliminating any loading wait.

I chose this pre-trained API streaming approach over training our own culinary model because training a custom transformer would have cost tens of thousands of dollars in GPU compute and required months of dataset curation, whereas Gemini 3 Flash delivers sub-second latency and excellent culinary knowledge right out of the box. If the AI gateway returns a 429 rate limit or 402 payment error, my stream handler catches it immediately and displays a friendly error banner rather than leaving the chat hanging. One limitation right now is that the edge function doesn't persist the chat history to a database, so conversations reset on page refresh, which I plan to solve by storing message threads in Supabase PostgreSQL tables."

---

### F2: Real-Time Kitchen Safety Computer Vision Guard (Core Feature — 16 Lines)
"I built the Kitchen Safety Vision Guard because home kitchen fires frequently start when people leave simmering oil or boiling pots unattended. The hardware camera sensor on the range hood sends an image classification payload to our Express backend at `/api/vision`. The request enters `safetyController.js`, which passes the telemetry payload to `visionService.js`. The service evaluates the frame hazard level and immediately persists an incident record to MongoDB using the `SafetyLog` Mongoose model with a timestamp and high severity flag.

I chose this decoupled Express endpoint pattern rather than running computer vision directly in the browser because heavy frame processing drains mobile battery life and drops frame rates during video playback. If an invalid payload is sent or the database connection drops, the try-catch block in `safetyController` catches the exception and returns an HTTP 500 JSON error with the failure reason. Currently, the service has a mock hazard classification rule in `visionService.js` that flags smoke events, so my next improvement will be connecting a pre-trained OpenCV or YOLOv8 edge inference container to analyze bounding boxes for open flames."

---

### F3: Passwordless Magic Link & JWT Authentication (Medium Feature — 10 Lines)
"I implemented the Magic Link authentication system to remove password fatigue for cooks who just want to quickly access their saved recipes without dealing with credential stuffing vulnerabilities. When a user submits their email on `/login`, `requestLink` in `authController.js` generates a JSON Web Token signed with `process.env.JWT_SECRET` that expires strictly in fifteen minutes. When the user clicks the magic link, `verifyLink` checks the signature with `jwt.verify`. If valid, it queries MongoDB using `User.findOne` and creates a new user document if they don't already exist, returning an HTTP 200 with the active user record.

I selected Magic Link JWTs instead of traditional password hashing with bcrypt because passwordless auth eliminates database password leaks entirely and provides a much better user experience on mobile devices. If an expired or tampered token is submitted, the catch block intercepts `TokenExpiredError` or `JsonWebTokenError` and responds with an HTTP 401 status. In the current development build, the magic link is logged to the server terminal because SMTP requires external mailer credentials, so moving forward I would hook up Resend or AWS SES to dispatch real HTML verification emails."

---

### F4: Culinary Reel Engine & Video Feed (Core Feature — 14 Lines)
"I built the Culinary Reel Engine in `ReelsFeed.tsx` to give users an engaging, TikTok-style browsing experience focused exclusively on fast, high-quality cooking tutorials. As the user swipes through videos, the feed renders full-height video containers displaying the creator's avatar, dish title, duration, and social metrics. Users can like videos with instantaneous optimistic UI updates, open a comment drawer, or tap the recipe button to immediately slide up the ingredients and preparation steps without navigating away from the video.

I chose a pure React 18 component structure with Tailwind CSS rather than embedding heavy third-party video players because custom HTML5 video elements give us full control over gesture listeners, audio muting states, and memory cleanup when videos scroll off screen. If a video asset fails to load, the component gracefully falls back to high-resolution dish imagery from `recipes.ts`. Right now, the reels feed consumes local seed data, so my next iteration will be connecting an infinite scrolling TanStack Query hook that fetches video manifests dynamically from an S3 bucket with cloud transcoding."

---

### F5: Portion Scaler & Kitchen Multi-Timer (Medium Feature — 9 Lines)
"I developed the Portion Scaler and Multi-Timer features to solve two huge headaches during active meal prep: math errors when doubling recipes and burnt food from lost track of cooking steps. In `RecipeDetail.tsx`, users click plus or minus buttons to scale serving counts, which triggers a pure calculation function that re-parses ingredient quantities and updates the UI instantly. In `TimerPage.tsx`, cooks can run three or four parallel countdowns labeled for different pans on the stove, using `setInterval` hooks that trigger a Web Audio API beep when a timer hits zero.

I chose client-side state for these utilities rather than server API calls because timer ticks and portion recalculations need zero network latency and must function reliably even if the kitchen Wi-Fi dips. If a timer reaches zero while the browser tab is in the background, the document title flashes and an alert chime sounds so the user never misses an alarm. Currently, refreshing the page resets active countdowns, so my planned upgrade is storing active timer timestamps in `localStorage` so they resume seamlessly across page reloads."

---

### F6: Member Profile & Preference Engine (Small Feature — 5 Lines)
"I built the Member Profile endpoint in `memberController.js` and `memberService.js` to retrieve user-specific settings such as dark mode preferences and avatars. It queries MongoDB by member ID and explicitly invokes `.select('-password')` so that sensitive authentication credentials can never be leaked to the frontend client. I chose Mongoose query projections because security should always be enforced at the data layer rather than relying on frontend filtering. If the member ID does not exist, it returns a 500 or 404 error, and for the next sprint I will integrate Redis caching to serve frequent profile lookups in under five milliseconds."

---

### F7: Ghost Chef Side-by-Side Comparison (Medium Feature — 8 Lines)
"I built the Ghost Chef feature in `GhostChefComparison.tsx` to let curious home cooks explore multiple culinary philosophies for the same dish. When a user requests a comparison, the edge function switches its system prompt to the 'ghostchef' persona, prompting Gemini 3 Flash to adopt a dramatic, theatrical tone that contrasts traditional grandmother-style cooking techniques against modern modernist cuisine.

I implemented this using dynamic prompt routing in `chef-ai/index.ts` rather than hardcoding separate AI endpoints, which keeps our backend maintenance footprint tiny while maximizing LLM flexibility. If the stream terminates prematurely, the client gracefully flushes any remaining buffered tokens so the user never sees chopped sentences. One trade-off is that theatrical prompts consume slightly more tokens, so in the future I'll allow users to toggle between detailed and concise explanation modes."

---

### F8: Weekly Meal Planner & Drag-and-Drop Calendar (Medium Feature — 8 Lines)
"I designed the Meal Planner in `MealPlannerPage.tsx` to help individuals and families organize their weekly nutrition without feeling overwhelmed. Users can assign curated recipes to breakfast, lunch, and dinner slots across a seven-day grid, providing a visual overview of their cooking schedule.

I used local React state combined with TanStack Query caching so that moving recipes between days feels snappy and instantaneous. When a meal plan is confirmed, a single click passes all required ingredients to the grocery list generator, eliminating the tedious chore of writing out shopping lists manually. Currently, the meal plan resets if local storage is cleared, so I plan to persist weekly calendar schedules into MongoDB so users can sync their meal plans across mobile phones and kitchen smart displays."

---

## 3. Rehearsal Checklist

Tick each box once you can deliver the explanation aloud without looking at notes in under the allotted time:

- [ ] **30-Second Elevator Pitch** (Target: 30 seconds)
- [ ] **2-Minute Technical Pitch** (Target: 120 seconds)
- [ ] **F1: AI Generative Chef & Structured Recipe Extraction** (Target: 90 seconds)
- [ ] **F2: Real-Time Kitchen Safety Computer Vision Guard** (Target: 80 seconds)
- [ ] **F3: Passwordless Magic Link & JWT Authentication** (Target: 60 seconds)
- [ ] **F4: Culinary Reel Engine & Video Feed** (Target: 75 seconds)
- [ ] **F5: Portion Scaler & Kitchen Multi-Timer** (Target: 50 seconds)
- [ ] **F6: Member Profile & Preference Engine** (Target: 30 seconds)
- [ ] **F7: Ghost Chef Side-by-Side Comparison** (Target: 45 seconds)
- [ ] **F8: Weekly Meal Planner & Drag-and-Drop Calendar** (Target: 45 seconds)
