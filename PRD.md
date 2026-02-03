<!-- prd.md (REWRITTEN: MVP-first + Post-hack backlog) -->

# PRD: Impulse Buy Funeral (Hackathon MVP)

## 1) What we’re building
Impulse Buy Funeral is a playful consumer web app that helps people avoid impulse purchases by showing real prices, cheaper alternatives, and a “pause” flow (48-hour wait).  
The special sauce is **Generative UI**: users type what they want in natural language and the app renders the right UI components automatically using Tambo’s React SDK.

## 2) Why this wins the hackathon
The hackathon explicitly rewards projects that use Tambo to build React apps where the AI decides which components to render from conversation, and that create interfaces users don’t have to “learn.” 
This PRD is intentionally optimized for a clear demo of that: different prompts reliably produce different components. 

---

## 3) Goals (MVP)
- Make a 60–90 second demo where a user:
  1) searches a product (real data),
  2) sees a “typical price” view,
  3) asks to be talked out of it (timer appears),
  4) switches persona and optionally hears a roast. 
- Use **real product listings** (eBay search) in the core flow.
- Keep the build small```md
<!-- prd.md (REWRITTEN: MVP-first + Post-hack backlog) -->

# PRD — Impulse Buy Funeral (Hackathon MVP)

## 1) One-liner
A funny “wallet funeral” app that helps people stop impulse purchases by showing real prices, cheaper alternatives, and a 48-hour wait challenge—using Tambo **Generative UI** so the UI adapts to what the user says. 

## 2) Why this exists
Users don’t want to learn a new app flow when they’re tempted to buy something; they want an immediate answer and a better option.  
This hackathon is explicitly about building React apps where “the AI decides which components to render based on natural language conversations,” and our product is built to make that obvious in under 60 seconds. 

---

## 3) Goals (MVP)
- Clear generative UI demo: at least 4 different UI components appear due to different user messages. 
- Real product data: search results and prices come from an eBay-style product API (eBay Browse API) via a server proxy.
- Funny + useful: humor drives engagement, but the outcome is practical (save money / delay purchase).
- Voice personas: user can switch personas; TTS is button-triggered to control cost and annoyance.

## 4) Non-goals (MVP)
- No accounts, no payments, no affiliate links.
- No perfect global price accuracy or deep marketplace filtering.
- No production-grade persistence, abuse prevention, or analytics.

---

## 5) Target user
Consumer who impulse-buys gadgets, accessories, fashion, subscriptions, etc.—they want instant price sanity checks and a nudge to pause.

---

## 6) Core experience (MVP)

### 6.1 Primary flow
1. User types a natural message: “I want AirPods Pro under $200.”
2. App shows real results + typical price range.
3. User says: “Talk me out of it.”
4. App renders a 48-hour wait timer + “quick actions” (Wishlist, Remind me, Buy anyway).
5. User clicks “Roast me” to generate a short voice line, and can switch persona.

### 6.2 Generative UI moments (must be visible)
We must show the UI adapt:
- Search intent → results grid + price breakdown
- “Cheaper options” intent → alternatives view (can be a mode within results grid for MVP)
- “Talk me out of it” intent → wait timer view
- “Switch persona” intent → persona switcher UI

This matches Tambo’s model: register components with Zod prop schemas + descriptions so it can choose and render them from user messages.[1]

---

## 7) MVP feature set

### 7.1 Onboarding (lightweight)
- Ask:
  - monthly fun budget
  - currency
  - marketplace/region (default EBAY_US)
  - default persona
  - voice enabled toggle (default off)
- Save locally (no signup).

### 7.2 Product search + price sanity
- Fetch top 10 results for the query.
- Compute:
  - typical price (median)
  - min/max of sample
  - “budget impact” (typical price / monthly fun budget)

### 7.3 Wait challenge (“Funeral Mode”)
- 48-hour timer component appears when user asks to be stopped / talked out.
- Quick actions:
  - “Wait 48 hours” (starts timer)
  - “Wishlist it”
  - “Buy anyway” (allowed; we’re not policing, just nudging)

### 7.4 Personas + TTS (button only)
- Persona switcher (4 personas):
  - Strict Parent
  - Sarcastic Bestie
  - Zen Monk
  - Corporate CFO
- “Roast me” button generates a single short voice line via ElevenLabs.
- Voice respects persona selection.

ElevenLabs provides a Create Speech endpoint at `/v1/text-to-speech/:voice_id` to generate audio.[1]

### 7.5 Game layer (minimal)
- Money saved total (simple)
- Streak days (simple)
- Impulse level label (derived)
Shown only when it helps the demo; do not build complex gamification.

---

## 8) UX requirements (MVP)
- The app must feel like a chat-first assistant with UI that appears *as needed*.
- Keep the number of screens minimal; the story is “chat → UI appears.”
- TTS must never autoplay on first run (default off).

---

## 9) Functional requirements (MVP)

### FR1: Tambo component registration
- Components registered statically at app startup via `TamboProvider components=[...]`, which Tambo recommends for most cases.[1]
- Each component includes:
  - Zod props schema
  - description describing both what it does and when to use it (important for correct selection).[1]
- Components must handle streaming props as initially undefined (Tambo streaming behavior).[1]

### FR2: Real search results
- Server proxies eBay search and returns normalized items.
- Results show title + price + image (if available).

### FR3: Daily usage caps (minimal)
- Daily caps exist to protect API usage and credits:
  - eBay searches/day
  - TTS calls/day
- MVP identity is only `deviceId` (stored in localStorage). If the server restarts, counters reset (acceptable for hackathon).

### FR4: Voice persona switching
- Persona switch must affect roast text style and voice ID.
- Voice output must be generated only on explicit button click.

---

## 10) Success criteria (for judging)
This hackathon judges impact, creativity, learning, technical implementation, aesthetics/UX, and “best use case of Tambo.” 

MVP success = demo hits:
- One meaningful consumer problem (“I’m about to buy something dumb”) and solves it quickly.
- Obvious Generative UI: viewers see multiple UI components appear from different prompts. 
- Polished UX theme (funeral) without being cluttered.

---

# Post-hack backlog (do NOT build during hackathon)

## A) Persistence + reliability
- SQLite for daily limits and caching
- Robust token refresh, retries, and structured logging

## B) Better limits / abuse prevention
- Add IP-based backstop and privacy-preserving IP hashing
- Burst rate limits (per minute) in addition to daily caps

## C) Product improvements
- Dedicated alternatives carousel component
- Better query rewriting + category filters
- Multi-marketplace support (more than eBay) and better region defaults

## D) Growth / retention
- Shareable “I survived an impulse buy” cards
- Optional user accounts + cloud sync

