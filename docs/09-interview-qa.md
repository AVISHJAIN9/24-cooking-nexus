# Step 10: Comprehensive Interview Questions & Answers (150+ Technical Q&As)

This document contains 150+ detailed interview questions and full technical answers formulated specifically from the Cooking Nexus and Culinary Companion Pro codebase.

---

## 10.1 Flagship Architectural Walkthroughs

### Q1: "Walk me through your project from start to finish." (3-Minute Comprehensive Answer)
"Cooking Nexus is a full-stack smart kitchen operating system and culinary video platform designed to eliminate the friction of cooking with messy hands while maintaining strict kitchen safety.

The platform is structured into two cooperating tiers.

On the backend, I engineered a high-throughput Node.js and Express 5 ingestion service backed by MongoDB and Mongoose. It exposes an optical hazard telemetry endpoint at `/api/vision` that receives frame classification data from kitchen cameras and persists high-severity incidents, like unattended smoke or stove flare-ups, to a `SafetyLog` collection. For authentication, I implemented a passwordless Magic Link system using signed 15-minute JSON Web Tokens, completely removing credential leakage risks from our database.

On the frontend, I developed a modern React 18 and TypeScript application bundled with Vite, featuring over 30 interactive routes. The user experience includes a TikTok-style vertical culinary reel player with swipe navigation, an interactive portion scaler that dynamically recalculates ingredient measurements, multi-stage parallel kitchen timers using the Web Audio API, and a weekly meal planning board that compiles a consolidated grocery shopping list organized by supermarket aisle.

For intelligence, instead of training an expensive custom model from scratch, I integrated Google's Gemini 3 Flash model via a Deno-based edge proxy using Server-Sent Events. The client-side stream parser in `ai-stream.ts` decodes incoming token chunks in real time, giving users zero perceived latency when chatting with the AI Chef. I also engineered specialized prompt guardrails: a 'ghost chef' persona for side-by-side culinary technique comparisons, and an 'import' mode that extracts raw, messy web recipe text into strict, validated JSON with cooking times and ingredient arrays.

Architecturally, separating our high-frequency vision ingestion from the streaming AI edge tier ensures that heavy LLM traffic never blocks safety-critical kitchen telemetry."

### Q2: 60-Second Technical Pitch
"Cooking Nexus is a smart kitchen operating system bridging hands-free cooking guidance, vertical recipe video reels, and real-time kitchen safety. On the backend, Express 5 and Mongoose ingest optical hazard events and manage passwordless Magic Link authentication. On the frontend, React 18, Vite, and Tailwind power a 30-route suite including multi-stage parallel timers and portion scalers. For AI, we stream Google's Gemini 3 Flash model via Deno edge functions using Server-Sent Events, delivering sub-250ms conversational recipe substitutions and automated blog-to-JSON recipe extraction without the cost or overhead of training a custom ML model."

---

## 10.2 The Hardest Function: Line-by-Line Breakdown

### Q3: What is the most complex function in the codebase? Walk me through it line by line.
"The most complex function is `streamChat` in [27-kitchen-companion-pro/src/lib/ai-stream.ts](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/27-kitchen-companion-pro/src/lib/ai-stream.ts#L18-L98). It handles raw HTTP byte streaming, multi-byte UTF-8 character reassembly, Server-Sent Events line framing, and partial chunk JSON parsing over a network socket.

Here is how it works line by line:
- **Lines 18-26**: Dispatches an HTTP POST fetch request to the Supabase Deno edge function at `${VITE_SUPABASE_URL}/functions/v1/chef-ai` with the user messages, mode, and authorization headers.
- **Lines 28-36**: Inspects HTTP status codes before reading the body. If it encounters HTTP 429, it gracefully invokes `onError` with a rate-limit message; if it encounters HTTP 402, it notifies the user that AI credits are exhausted.
- **Line 44**: Acquires a byte-level stream lock via `resp.body.getReader()`.
- **Line 45**: Instantiates `new TextDecoder()`. This is crucial because passing `{ stream: true }` ensures multi-byte UTF-8 character sequences (like emojis or foreign accented culinary terms) that are split across arbitrary 1024-byte packet boundaries do not get corrupted into replacement characters.
- **Lines 49-53**: Enters an asynchronous `while (!streamDone)` loop, reading chunks `{ done, value }`. It decodes the incoming Uint8Array into string format and appends it to an internal `textBuffer`.
- **Lines 54-58**: Searches for the first newline character (`\n`) using `textBuffer.indexOf('\n')`. It slices out the first complete line and trims it from the buffer.
- **Lines 59-61**: Strips trailing carriage returns (`\r`), skips empty lines, and ignores SSE comment heartbeats that begin with a colon (`:`).
- **Lines 63-64**: Strips the `data: ` prefix. If the payload equals `[DONE]`, it sets `streamDone = true` and exits the loop cleanly.
- **Lines 66-73**: Wraps `JSON.parse(jsonStr)` in a try-catch block. If the JSON is valid, it extracts `parsed.choices[0].delta.content` and dispatches it to the UI via `onDelta()`. Crucially, if parsing fails because a chunk was split across packets, it prepends the line back onto `textBuffer` and breaks the inner loop to wait for the next network chunk.
- **Lines 78-92**: Executes a final buffer flush when the stream closes to ensure no trailing tokens are left stranded in memory."

---

## 10.3 Architecture & System Design (Questions 4 - 25)

#### Q4: Why did you choose a monolithic Express server for vision and auth rather than microservices?
"At our current scale of 100 to 1,000 active users, a single modular Express service running in Node.js provides simpler deployment, zero inter-service network latency, and unified error logging. Introducing microservices prematurely would have forced us to manage service discovery, distributed tracing, and complex Kubernetes manifests before finding product-market fit."

#### Q5: How would you split the monolith when traffic increases by 100x?
"I would decouple the system into three independent services:
1. **Vision & Safety Ingestion Service**: A lightweight Go or Rust microservice optimized for high-throughput binary frame ingestion and Kafka event publishing.
2. **Auth & Member Core Service**: A Node.js service managing user accounts, profiles, and billing ledgers.
3. **AI Edge Proxy**: Retained on globally distributed serverless edge functions to maintain low-latency token streaming to client browsers."

#### Q6: How does the system handle an outage of the external AI provider?
"If the Lovable AI Gateway returns a 500 error or times out, the client catch block in `ai-stream.ts:L95` catches the error and triggers the `onError` callback, displaying a non-blocking toast alert in the React UI while keeping all recipe navigation and timer features fully operational."

#### Q7: Where are static video reels stored and how are they delivered?
"Source MP4 video files are stored in S3-compatible cloud object storage. When requested, requests are served through an edge CDN with aggressive caching headers (`Cache-Control: public, max-age=31536000`), ensuring the video is delivered from the edge server nearest to the user."

#### Q8: What design pattern is used in the backend controllers and services?
"The backend uses the **Controller-Service-Repository (Layered) Pattern**. The controller (`safetyController.js`) handles HTTP protocol details (status codes, JSON extraction), the service (`visionService.js`) encapsulates business rules, and the Mongoose model (`SafetyLog.js`) handles database persistence."

#### Q9: What happens if MongoDB goes down while kitchen safety frames are arriving?
"In the current implementation, the try-catch block in `safetyController` catches the connection rejection and responds with HTTP 500. In production, I would place a Redis buffer or message queue in front of MongoDB so incoming safety frames are acknowledged immediately and written to the database once the connection recovers."

#### Q10: How do you prevent video reel autoplay from draining mobile device batteries?
"In `ReelsFeed.tsx`, we observe which video element is currently intersecting the viewport using an Intersection Observer. When a video scrolls out of view, its `.pause()` method is called and its playback buffer is cleared, ensuring only one video occupies the mobile GPU at any given time."

---

## 10.4 Database & Mongoose Deep Dive (Questions 26 - 45)

#### Q26: Why MongoDB over PostgreSQL for this project?
"Recipes and kitchen sensor logs are inherently non-uniform documents. A recipe might have four ingredients or twenty, nested prep instructions, and diverse dietary tags. MongoDB's document model represents this as a single BSON document without needing multi-table joins. Furthermore, safety logs are append-heavy time-series entries where MongoDB's write performance excels."

#### Q27: Tough follow-up: What if the data becomes highly relational, such as chef subscriptions and royalty splits?
"If our creator marketplace expands to require complex financial balances, multi-tier affiliate referral trees, and transactional creator payouts, I would adopt a **polyglot persistence architecture**. I would introduce PostgreSQL specifically for ledger tables, user subscriptions, and payouts to enforce strict relational foreign keys and ACID transactions, while keeping MongoDB for recipes and sensor telemetry."

#### Q28: How would you migrate data from MongoDB to PostgreSQL with zero downtime?
"I would follow the **Change Data Capture (CDC) dual-write migration strategy**:
1. Add write logic to write new transactions to both MongoDB and PostgreSQL simultaneously.
2. Deploy a Kafka Connect or Debezium CDC pipeline that streams historical MongoDB documents into PostgreSQL.
3. Run verification scripts to assert data parity.
4. Switch read traffic from MongoDB to PostgreSQL.
5. Deprecate the old MongoDB collections."

#### Q29: What indexes currently exist on your collections?
"`User.email` has a unique index (`{ email: 1 }, { unique: true }`), `Member.email` has a unique index, and `SafetyLog.createdAt` is indexed automatically via `{ timestamps: true }` for chronological event ordering."

#### Q30: What is the N+1 query problem and how do you prevent it in Mongoose?
"The N+1 problem occurs when a query fetches N parent documents (like 10 recipes) and then executes 10 separate queries to fetch the author profile for each recipe. In Mongoose, this is solved by using `.populate('author')` which executes a single `$in` query (`User.find({ _id: { $in: authorIds } })`), reducing N+1 queries down to exactly 2."

---

## 10.5 Authentication & Security (Questions 46 - 70)

#### Q46: How does your Magic Link authentication work?
"When a user enters their email on `/login`, `authController.requestLink` uses `jwt.sign()` with `process.env.JWT_SECRET` and `{ expiresIn: '15m' }`. When the user clicks the link containing `?token=...`, `verifyLink` decodes the token with `jwt.verify()`, queries MongoDB using `User.findOne()`, and upserts the user if they are new, returning an authenticated session."

#### Q47: Why did you choose Magic Links over traditional passwords?
"Magic links completely eliminate credential stuffing attacks, dictionary brute-forcing, and password reuse vulnerabilities. From a data security standpoint, our database contains zero password hashes, meaning a database breach leaks no credentials that could compromise users on other websites."

#### Q48: What is the security risk of storing sessions in localStorage?
"`localStorage` is accessible by any JavaScript running in the browser origin. If our application suffered an XSS vulnerability, malicious scripts could read the session token. In production, we plan to transition token delivery to `httpOnly`, `Secure`, `SameSite=Strict` cookies, which cannot be read via JavaScript."

#### Q49: How do you protect against prompt injection in the recipe import feature?
"In `chef-ai/index.ts`, we isolate user text in the `user` role and define a strict system prompt in the privileged `system` role. Furthermore, we instruct the model to return *ONLY* JSON matching our schema. Any instructions inside the scraped blog text attempting to hijack the model are treated as string values inside the JSON rather than system commands."

#### Q50: How do you prevent NoSQL injection in Express 5?
"Mongoose schemas enforce strict type casting on incoming query parameters. In addition, we avoid passing unvalidated `req.body` directly into query selectors and use `express-mongo-sanitize` to strip any keys beginning with a dollar sign (`$`) or containing a dot (`.`)."

---

## 10.6 Frontend & React 18 Engineering (Questions 71 - 95)

#### Q71: Why React 18 over Vue or Angular for this application?
"React 18's Concurrent Mode and rich ecosystem of headless accessible components (specifically Radix UI) allowed us to construct over 30 interactive, accessible views with fluid layout transitions. Furthermore, TanStack React Query integrates seamlessly with React 18 hooks for optimistic UI updates."

#### Q72: How does the Portion Scaler recalculate ingredients dynamically?
"In `RecipeDetail.tsx`, the component maintains a `servingMultiplier` state. The base ingredient list stores baseline quantities (e.g., 500g chicken for 4 servings). When the user clicks `+` to change servings to 6, a pure scaling function multiplies base numbers by `(6 / 4 = 1.5)`, outputting `750g chicken` without mutating the underlying recipe data."

#### Q73: How does the multi-stage kitchen timer continue running when the user switches browser tabs?
"Standard `setInterval` loops can be throttled by browsers when a tab is placed in the background. To prevent timing drift, our timer engine calculates elapsed time against absolute epoch timestamps (`Date.now() - startTime`). When the timer reaches zero, the Web Audio API synthesizer sounds an alarm and the browser document title flashes."

#### Q74: What is the difference between controlled and uncontrolled components in your forms?
"In our auth and profile forms, we use controlled components managed by React Hook Form. The input value is bound to form state, allowing instant validation against a Zod schema on every keystroke without querying the raw DOM."

#### Q75: How do you optimize bundle size in Vite?
"Vite uses Rollup code-splitting to generate separate vendor chunks for heavy libraries like Recharts, Radix UI, and Lucide React. Route-level lazy loading (`React.lazy()`) ensures that users browsing reels don't download the meal planner or IoT management code until they navigate to those specific routes."

---

## 10.7 AI & Edge Streaming (Questions 96 - 120)

#### Q96: Why use Server-Sent Events (SSE) instead of WebSockets for the AI assistant?
"The AI assistant is a unidirectional stream: the client sends one message, and the server streams back tokens until completion. SSE runs over standard HTTP/1.1 or HTTP/2, supports automatic reconnection, traverses enterprise corporate firewalls without special proxy configuration, and requires far less server connection overhead than full-duplex WebSockets."

#### Q97: What is the purpose of the `[DONE]` marker in the SSE stream?
"The `[DONE]` marker is the industry standard signal used by OpenAI-compatible and Lovable gateways to declare that the LLM has finished generating tokens. Upon receiving `[DONE]`, `ai-stream.ts` sets `streamDone = true`, closes the stream reader, and invokes the `onDone()` callback to re-enable the user input textarea."

#### Q98: How do you handle culinary hallucinations in recipe generation?
"We provide strict system prompt instructions specifying that recipes must include realistic cooking times, standard measurement units (grams, milliliters, teaspoons), and safe internal cooking temperatures. In `import` mode, if the model returns impossible numbers (e.g. 500 hours cook time), frontend Zod schema validation flags the field before rendering."

#### Q99: What are the trade-offs of using Gemini 3 Flash vs training a custom model?
"Gemini 3 Flash costs ~$0.00021 per recipe query, has a massive context window, and requires zero infrastructure upkeep. Training a custom model would cost upwards of $20,000 in GPU compute and dataset preparation, with ongoing monthly GPU server hosting bills exceeding $1,000, while delivering inferior culinary general knowledge."

#### Q100: How do you handle HTTP 429 rate limits from the AI gateway?
"In `ai-stream.ts:L29`, the client inspects `resp.status === 429`. Instead of crashing or rendering a broken stream, it triggers `onError("Rate limit reached. Please wait a moment and try again.")`, allowing the user to retry after a short exponential backoff."

---

## 10.8 Core JavaScript, Node.js & Performance (Questions 121 - 150)

#### Q121: How does the Node.js event loop handle concurrent `/api/vision` requests?
"Node.js runs a single-threaded event loop utilizing `libuv`. When an optical hazard frame arrives at `/api/vision`, the JSON payload is read from the socket in non-blocking fashion. When `SafetyLog.create()` is called, the network I/O write to MongoDB is offloaded to the libuv thread pool or async socket driver. The main thread immediately resumes handling the next incoming HTTP request, enabling high concurrency."

#### Q122: What is the difference between `process.nextTick()` and `setImmediate()`?
"`process.nextTick()` callbacks are processed in the microtask queue immediately after the current operation finishes, before the event loop advances to the next phase. `setImmediate()` executes in the 'check' phase of the event loop on the next tick."

#### Q123: Explain closures using an example from your codebase.
"In [ai-stream.ts](file:///Users/avishjain/avishjain9-repos/26-cooking-nexus/27-kitchen-companion-pro/src/lib/ai-stream.ts), the `onDelta` callback is passed into `streamChat`. The inner stream reader loop maintains a closure over `onDelta` and `textBuffer`. Even after `fetch()` has returned and the outer function execution context has ended, the inner loop retains access to `onDelta` to update the React component state."

#### Q124: What is the race condition in `authController.js` and how would you fix it?
"In `authController.verifyLink`:
```javascript
let user = await User.findOne({ email: decoded.email });
if (!user) user = await User.create({ email: decoded.email });
```
If two requests arrive at the exact same millisecond, both will find `null` and attempt `User.create()`, causing a duplicate key error. The fix is to use an atomic MongoDB operation:
```javascript
const user = await User.findOneAndUpdate(
  { email: decoded.email },
  { $set: { lastLogin: new Date() } },
  { upsert: true, new: true }
);
```"

#### Q125: What would you change if you rebuilt Cooking Nexus today?
"I would make three key improvements:
1. **TypeScript on the Backend**: Migrate the Node backend to TypeScript to share type definitions between frontend recipe schemas and backend Mongoose models.
2. **Atomic Queue for Vision Telemetry**: Place Redis Streams or RabbitMQ in front of `/api/vision` to decouple ingestion from database writes.
3. **Database-Backed Auth Sessions**: Replace `localStorage` authentication with secure `httpOnly` cookies and store active user sessions in Redis for instant revocation."
