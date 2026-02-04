# WalletWake ⚰️💸

> *The Impulse Buy Funeral Service.*

WalletWake is a **Generative UI** app that intercepts impulse buying. Instead of "Buy Now", you get a funeral for your wallet. The AI detects purchase intent (via chat), renders custom components on the fly, and the app walks you through a 48-hour cooling-off flow with guilt math (ramen packs, coffee, Netflix months) and a final "Clarity" decision screen.

Built for the **Tambo Hackathon** ("The UI Strikes Back") — 100% on the Tambo React SDK.

---

## 🎥 Demo

*(Link to your 2-minute video here)*

---

## 🛠️ Tech Stack

| Layer | Stack |
|-------|--------|
| Framework | Next.js 16 (App Router), React 19 |
| Generative UI | **Tambo React SDK** (`@tambo-ai/react`) — `useTamboThread`, `useTamboThreadInput`, registered tools |
| Styling | Tailwind CSS v4 |
| Validation | Zod (tool props schemas) |
| Icons | Lucide React |

**Tambo compliance**

- **Generative UI:** Chat overlay uses `useTamboThread` / `useTamboThreadInput`. The AI chooses when to render `funeral-ticket` or `roast-receipt`; no hardcoded `if (input === 'gta5')`.
- **Component registration:** Two tools in `app/providers.tsx`: `funeral-ticket` (FuneralTicket), `roast-receipt` (RoastReceipt). Zod schemas with optional/defaults so missing AI fields don’t crash.
- **Adaptive UX:** App switches by state: **Search** (intent) → **Funeral** (friction, 48h) → **Clarity** (reward).

---

## 🚀 Features

### 1. WalletWake Agent (Generative UI)

- **Chat overlay** (bottom-right bubble) powered by Tambo.
- Say *"I want to buy a PS5"* or *"Give me a receipt for that headphone"* — the AI:
  - Picks the right tool (`funeral-ticket` or `roast-receipt`).
  - Fills props (title, price, reason / receipt line items).
  - Renders the component **inside the chat**.
- **FuneralTicket:** Skull card with product, price, snarky reason, and **"Enter Funeral Mode"** (writes to localStorage + reload so main page enters Funeral).
- **RoastReceipt:** Sarcastic receipt (productName, total, roast, line items) with **"Enter Funeral Mode"** (same behavior).

### 2. Manual search path

- Main search bar calls `GET /api/ebay/search?q=...` (mock DB in `lib/mock-db.ts`).
- Results grid: each product card has **Select** → `startFuneral(item)` → Funeral Mode.

### 3. Funeral Mode

- **FuneralView** (dark full-screen):
  - Product image (grayscale), price, 48h countdown.
  - **Guilt grid:** price as ramen packs, coffees, min-wage hours, Netflix months (`lib/currency-converter.ts`).
  - Optional alternatives (e.g. "Buy Anyway" / alternatives hook).
- **DEMO: SKIP 48H** button (bottom-right) sets death date to 49h ago and reloads so you can test Clarity without waiting.

### 4. Clarity Mode

- After 48h (or demo skip), **ClarityView** (light theme):
  - "The impulse has passed."
  - Recap + **"Purchase with Clarity"** (opens link) or **"I don’t want it anymore"** (`clearFuneral`).

---

## 📁 Project structure

```
app/
  layout.tsx          # Root layout, Providers (Tambo)
  page.tsx            # Home: search vs funeral vs clarity branching, ChatOverlay
  providers.tsx       # TamboProvider, funeral-ticket + roast-receipt registration
  globals.css         # Tailwind v4 theme (--color-background/foreground, dark)
  components/
    ChatOverlay.tsx   # Floating chat (useTamboThread, message list, renderedComponent)
    FuneralTicket.tsx # AI tool: warning ticket → Enter Funeral (reload)
    RoastReceipt.tsx  # AI tool: sarcastic receipt → Enter Funeral (reload)
    FuneralView.tsx   # 48h funeral screen (timer, guilt grid, alternatives)
    ClarityView.tsx   # Post-48h "purchase with clarity" screen
    ProductCard.tsx   # Search result card
    SearchInput.tsx   # Main search input
  hooks/
    useImpulseStore.ts   # funeralState, startFuneral, clearFuneral, isResurrected, fastForward, localStorage
    useAlternatives.ts  # (used in FuneralView)
  api/
    ebay/search/route.ts # GET ?q= → mock search → itemSummaries
lib/
  mock-db.ts          # Mock product list, searchMockProducts(query)
  currency-converter.ts # getConversions(price) → ramen/coffee/hours/Netflix
  utils.ts            # cn() etc.
```

---

## 📦 Installation

1. **Clone and install**

   ```bash
   git clone https://github.com/yourusername/walletwake.git
   cd walletwake
   npm install
   ```

2. **Environment**

   Create `.env.local`:

   ```env
   # Required for Chat / Generative UI
   NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_key
   ```

   (eBay keys optional; search uses mock data by default.)

3. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## 🧛‍♂️ Hackathon notes for judges

- **Generative UI (must-have):** Open the **chat bubble** (bottom-right). Type *"I want to buy GTA 5"* or *"Give me a receipt for a $500 laptop"*. The AI renders **FuneralTicket** or **RoastReceipt** in the thread. Click **"Enter Funeral Mode"** → page reloads → Funeral screen.
- **Manual path:** Use the main search bar, pick a product, click **Select** → same Funeral flow.
- **Demo speed:** In Funeral Mode, use the **"⏩ DEMO: SKIP 48H"** button (bottom-right) to jump to Clarity without waiting 48 hours.

---

Built with 🖤 for the Tambo Hackathon.
