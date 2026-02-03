<!-- todo.md -->


## Step 1 — Repo scaffolding
- [ ] Create monorepo folders: `apps/web`, `services/api`, `docs/` and commit baseline structure.
**Test:** `tree` shows expected directories; repo clones cleanly.

## Step 2 — Web app bootstrap
- [ ] Initialize React + Vite app under `apps/web`.
- [ ] Add a single “Hello” page component.
**Test:** `bunx vite` starts; visiting localhost shows the page.

## Step 3 — API service bootstrap
- [ ] Initialize Bun service under `services/api` with a minimal server entry file.
- [ ] Add `/health` route returning 200 and a small JSON payload.
**Test:** `bun run` starts server; `curl localhost:<port>/health` returns 200 with JSON.

## Step 4 — CORS + dev wiring
- [ ] Add minimal CORS handling in Bun service (allow web dev origin).
- [ ] Add a frontend env var for API base URL.
**Test:** From the browser, frontend can fetch `/health` without CORS errors.

## Step 5 — Shared API error shape
- [ ] Define a single JSON error response shape in API (code + message).
- [ ] Ensure unknown routes return 404 in that shape.
**Test:** `curl /nope` returns 404 with `{ error: { code, message } }`.

## Step 6 — Local device identity (client)
- [ ] Add `LocalDeviceIdentityV1` storage module in `apps/web/src/lib/storage`.
- [ ] On app load, ensure `deviceId` exists (generate once, persist).
**Test:** Refresh page; deviceId stays stable in localStorage.

## Step 7 — Onboarding storage (client)
- [ ] Add `LocalOnboardingV1` storage module (defaults: EBAY_US, USD, voiceEnabled=false).
- [ ] Render a simple onboarding UI stub that writes values to localStorage.
**Test:** Fill form; reload; values persist and rehydrate correctly.

## Step 8 — Minimal game state storage (client)
- [ ] Add `LocalGameStateV1` storage module with default values.
- [ ] Add “Reset local data” button that clears all local keys.
**Test:** Reset works; app recreates deviceId and defaults on next load.

---

## Step 9 — Tambo dependency + provider
- [ ] Install `@tambo-ai/react` and `zod` in web app. [page:0]
- [ ] Wrap app in `TamboProvider` with an empty `components=[]` list (temporary). [page:0]
**Test:** App runs with provider; no runtime errors.

## Step 10 — Tambo component registry skeleton
- [ ] Create `apps/web/src/tambo/registry/index.ts` exporting an array of Tambo components.
- [ ] Add one dummy generative component registration with:
  - Zod props schema
  - clear `.describe()` hints
  - description describing what+when. [page:0]
**Test:** App boots; registry imports; no type/runtime errors.

## Step 11 — Streaming-safe component contract check
- [ ] Add a “component props may be undefined during streaming” checklist comment + type pattern in registry.
**Test:** Static type check passes with optional props pattern (no runtime test yet). [page:0]

---

## Step 12 — API: env var contract
- [ ] Define required server env vars (EBAY_CLIENT_ID, EBAY_CLIENT_SECRET, ELEVENLABS_API_KEY).
- [ ] Add startup validation that fails fast with clear message if missing.
**Test:** Running without env vars exits with a clear error; running with them starts.

## Step 13 — API: daily counters (in-memory)
- [ ] Implement an in-memory `DailyCounters` module keyed by `date + deviceId`.
- [ ] Add functions: `getRemaining`, `incrementEbay`, `incrementTts`, `resetIfNewDay`.
**Test:** Unit test module with fake dates: counts increment and reset correctly.

## Step 14 — API: deviceId extraction
- [ ] Read `X-Device-Id` header; validate format (non-empty string).
- [ ] If missing, return 400 error shape.
**Test:** `curl` without header → 400; with header → proceeds.

---

## Step 15 — API: eBay token fetch contract (client credentials)
- [ ] Create a module that requests an eBay Application access token via client credentials flow. [page:2]
- [ ] Store token in memory with `expiresAt` computed from `expires_in=7200`. [page:2]
**Test:** With valid eBay creds, a manual run logs “token acquired”; repeated calls reuse token until expiry.

## Step 16 — API: eBay token reuse behavior
- [ ] Add logic: if token exists and not expired, do not mint a new one. [page:2]
**Test:** Two consecutive token-dependent operations result in only one token request (verify via debug log or counter).

## Step 17 — API: eBay search route contract
- [ ] Add `GET /api/ebay/search?q=&limit=&marketplaceId=` route that:
  - enforces daily limit before upstream call
  - uses cached token
  - calls eBay Browse API search
  - normalizes results. [page:2]
**Test:** `curl` returns 200 JSON with `items[]` and no secrets leaked.

## Step 18 — API: eBay search normalization
- [ ] Implement `normalizeEbaySearchResponse → ListingSummary[]`.
- [ ] Implement `SearchStats` median/min/max computation from normalized prices.
**Test:** Unit test with fixture JSON returns expected normalized list and median.

## Step 19 — API: eBay search limit enforcement
- [ ] Cap searches/day (config constant).
- [ ] Return 429 with error shape and reset time.
**Test:** Repeated calls exceed limit; last call returns 429 with expected payload.

## Step 20 — API: eBay search short TTL cache (in-memory)
- [ ] Cache normalized search response by `(marketplaceId, normalizedQuery, limit)` for ~5 minutes.
**Test:** Two identical calls within TTL do not increment eBay usage counter twice (or at least do not hit upstream twice; choose one and assert it).

---

## Step 21 — Web: API client wrapper
- [ ] Create `apps/web/src/lib/api/client.ts` wrapper that:
  - sends `X-Device-Id`
  - handles error shape
  - decodes JSON responses
**Test:** Frontend can fetch `/api/ebay/search` and display raw JSON.

## Step 22 — Web: search input + results (non-Tambo baseline)
- [ ] Add a simple search bar UI that calls `/api/ebay/search`.
- [ ] Render results grid (title + price + image).
**Test:** Type a product; see real results; errors shown nicely.

## Step 23 — Web: price stats UI
- [ ] Render typical/min/max and sample size from API response.
**Test:** Stats appear and update per query.

---

## Step 24 — Tambo: define MVP component schemas (5)
Create 5 generative component specs with Zod schemas + `.describe()` hints + descriptions (what+when). [page:0]
- [ ] `OnboardingBudgetCard`
- [ ] `ProductResultsGrid`
- [ ] `PriceBreakdownPanel`
- [ ] `WaitTimer48h`
- [ ] `PersonaSwitcher`
**Test:** App compiles; registry exports 5 components; no runtime errors.

## Step 25 — Tambo: wire registry into provider
- [ ] Pass registry array into `TamboProvider components={...}` (static registration). [page:0]
**Test:** App loads; Tambo provider initializes with all components.

## Step 26 — Generative UI: message → component switching (demo harness)
- [ ] Add a simple “demo chat” harness that sends messages into Tambo and shows generated components.
**Test:** Enter 4 prompts and confirm 4 distinct components appear at least once.

---

## Step 27 — Persona model (client)
- [ ] Define persona list (4 items) including personaId, displayName, voiceId, styleGuidance.
- [ ] Store selectedPersonaId in local onboarding.
**Test:** Switching persona updates stored selection and UI label.

## Step 28 — API: ElevenLabs TTS route contract
- [ ] Add `POST /api/tts` that:
  - validates payload (voiceId, text)
  - enforces daily TTS limit
  - calls ElevenLabs Create speech endpoint. [page:1]
**Test:** `curl` returns audio bytes with `Content-Type` set; errors return JSON shape.

## Step 29 — Web: TTS “Roast me” button
- [ ] Add button that calls `/api/tts` and plays returned audio.
- [ ] Ensure no autoplay on first load; only plays on click.
**Test:** Click → audio plays; no audio without clicking.

## Step 30 — Web: persona switching affects TTS
- [ ] Wire persona selection → voiceId used in `/api/tts` request.
**Test:** Switch persona; roast voice changes (or at least voiceId sent differs).

## Step 31 — Daily limit UX (web)
- [ ] When API returns 429, render a clear “Limit reached” banner and disable the action.
**Test:** Simulate limit exceeded; UI handles gracefully.

---

## Step 32 — Timer + wait actions (web)
- [ ] Add “Wait 48h” action that sets an `endsAt` timestamp in local state/storage.
- [ ] Render countdown in `WaitTimer48h`.
**Test:** Start timer; refresh; timer persists and counts down.

## Step 33 — Game state increments (web)
- [ ] Implement minimal scoring updates:
  - Wait/Wishlist → moneySavedTotal increments
  - Wait → streakDays logic (simple daily).  
**Test:** Trigger actions; state changes predictably and persists.

---

## Step 34 — End-to-end demo script validation
- [ ] Verify demo prompts produce required component transitions:
  1) search → results + price breakdown
  2) “talk me out” → timer
  3) “switch persona” → persona UI
  4) “roast me” → audio
**Test:** Run the script; record a short video; all steps succeed without manual fixes.

## Step 35 — Docs alignment (final)
- [ ] Update README with:
  - prerequisites
  - env vars
  - run commands for web + api
  - demo script prompts
**Test:** Fresh clone setup works using README only.

