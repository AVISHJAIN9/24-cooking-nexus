# Step 4: Complete API Reference

This document provides a formal, production-grade API reference for all backend endpoints, edge functions, and external AI integrations across the Cooking Nexus platform.

---

## 4.1 Master Endpoints Summary Table

| Method | Route Path | Access | Handler Function | Data Touched | Purpose |
|---|---|---|---|---|---|
| `POST` | `/api/vision` | Public (IoT Device) | `safetyController.detect` | `SafetyLog` (Create) | Kitchen safety hazard vision ingestion |
| `POST` | `/api/auth/login` | Public | `authController.requestLink` | None | Signs and issues 15-minute magic login token |
| `GET` | `/api/auth/verify`| Public (Query Token) | `authController.verifyLink` | `User` (Find/Create) | Verifies JWT and returns authenticated user session |
| `GET` | `/api/members/:id`| Protected / Public | `memberController.getProfile`| `Member` (FindById) | Retrieves user profile preferences omitting password |
| `POST` | `/functions/v1/chef-ai`| Bearer / Anon Key | Edge Handler `serve()` | External Gemini 3 | Edge AI streaming chat and recipe parser |

---

## 4.2 Endpoint Specifications

### 1. Ingest Kitchen Safety Vision Telemetry
```http
POST /api/vision
Content-Type: application/json
```

- **Purpose**: Receives optical frame telemetry from smart kitchen cameras and creates an incident record.
- **Middleware Chain**: `express.json()` -> `safetyController.detect` -> `visionService.analyze`
- **Request Headers**:
  - `Content-Type: application/json`
- **Request Body Sample**:
  ```json
  {
    "deviceId": "hood_cam_kitchen_01",
    "timestamp": 1740484800000,
    "confidence": 0.94,
    "hazardType": "Smoke Detected"
  }
  ```
- **Success Response (HTTP 200 OK)**:
  ```json
  {
    "_id": "67bc98124f1e09a32c58a104",
    "hazard": "Smoke Detected",
    "level": "High",
    "createdAt": "2026-10-25T12:00:00.000Z",
    "updatedAt": "2026-10-25T12:00:00.000Z",
    "__v": 0
  }
  ```
- **Error Responses**:
  - `HTTP 500 Internal Server Error`: Returned when database write fails or body parsing fails.
    ```json
    { "error": "MongoServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017" }
    ```

---

### 2. Request Magic Authentication Link
```http
POST /api/auth/login
Content-Type: application/json
```

- **Purpose**: Generates a tamper-proof 15-minute JWT signed with the server's secret key and logs a magic login URL.
- **Middleware Chain**: `express.json()` -> `authController.requestLink`
- **Request Body Sample**:
  ```json
  {
    "email": "chef.priya@example.com"
  }
  ```
- **Validation Rules**: Email must be provided in body.
- **Success Response (HTTP 200 OK)**:
  ```json
  {
    "message": "Check your console for the magic link!"
  }
  ```
- **Server Console Output**:
  ```
  Magic Link Generated: http://localhost:5000/api/auth/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

---

### 3. Verify Magic Login Token
```http
GET /api/auth/verify?token={jwt_token}
```

- **Purpose**: Decodes query token, verifies cryptographic signature, checks expiration, and retrieves or creates user in MongoDB.
- **Query Parameters**:
  - `token` (String, Required): HMAC-SHA256 signed JSON Web Token.
- **Success Response (HTTP 200 OK)**:
  ```json
  {
    "message": "Login Successful",
    "user": {
      "_id": "67bc99444f1e09a32c58a109",
      "email": "chef.priya@example.com",
      "lastLogin": "2026-10-25T12:05:00.000Z",
      "__v": 0
    }
  }
  ```
- **Error Responses**:
  - `HTTP 401 Unauthorized`:
    ```json
    { "message": "Invalid or expired token" }
    ```

---

### 4. Get Member Profile Data
```http
GET /api/members/:id
```

- **Purpose**: Queries `members` collection by MongoDB `_id` and excludes the `password` field via Mongoose projection.
- **Path Parameters**:
  - `id` (String, Required): Hexadecimal 24-character MongoDB ObjectId.
- **Success Response (HTTP 200 OK)**:
  ```json
  {
    "_id": "67bc99884f1e09a32c58a112",
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "preferences": {
      "theme": "dark"
    },
    "lastLogin": "2026-10-25T11:45:00.000Z",
    "createdAt": "2026-09-01T08:00:00.000Z",
    "updatedAt": "2026-10-25T11:45:00.000Z"
  }
  ```
- **Error Responses**:
  - `HTTP 500 Internal Server Error`:
    ```json
    { "error": "Cast to ObjectId failed for value 'invalid-id'" }
    ```

---

### 5. Edge AI Streaming Chat & Recipe Extraction
```http
POST /functions/v1/chef-ai
Authorization: Bearer ${VITE_SUPABASE_PUBLISHABLE_KEY}
Content-Type: application/json
```

- **Purpose**: Edge proxy passing conversation messages to Google's Gemini 3 Flash preview model via Server-Sent Events (SSE).
- **Request Headers**:
  - `Authorization: Bearer <anon_jwt_token>`
  - `Content-Type: application/json`
- **Request Body Sample**:
  ```json
  {
    "messages": [
      { "role": "user", "content": "How do I make a dairy-free Hollandaise sauce?" }
    ],
    "mode": "chat"
  }
  ```
- **Modes Supported**:
  - `chat`: General culinary conversation with markdown formatting.
  - `ghostchef`: Theatrical culinary contrast between traditional vs modern technique.
  - `import`: Strict JSON schema extraction for web recipes.
- **Success Response (HTTP 200 OK - SSE Stream)**:
  - Header: `Content-Type: text/event-stream`
  ```
  data: {"choices":[{"delta":{"content":"To make a "}}]}
  data: {"choices":[{"delta":{"content":"dairy-free "}}]}
  data: {"choices":[{"delta":{"content":"Hollandaise..."}}]}
  data: [DONE]
  ```
- **Error Responses**:
  - `HTTP 429 Too Many Requests`: `{ "error": "Rate limit exceeded" }`
  - `HTTP 402 Payment Required`: `{ "error": "Payment required" }`
  - `HTTP 500 Internal Server Error`: `{ "error": "AI gateway error" }`
