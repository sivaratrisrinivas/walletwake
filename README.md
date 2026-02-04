# WalletWake ⚰️💸

The impulse buy funeral service.

---

## What

App that blocks the "buy now" reflex. You say what you want (chat or search). App shows a "funeral" for that purchase: price as ramen packs, coffees, hours of work. Then a 48-hour wait. After that you can buy with a clear head or walk away.

---

## Why

Impulse buys feel good for 5 minutes. This adds friction so you see the real cost and wait. If you still want it after 48 hours, fine — that’s a choice, not a reflex.

---

## How

**Use it**

- Chat (bubble bottom-right): type e.g. "I want a PS5" or "Give me a receipt for a $500 laptop". AI shows a card or receipt. Click **Enter Funeral Mode** → full-screen funeral (guilt math, 48h timer). After 48h (or **DEMO: SKIP 48H** button) you get a "Clarity" screen: buy or close.
- Search (main bar): search, pick a product, click **Select** → same funeral flow.

**Run it**

```bash
git clone https://github.com/yourusername/walletwake.git
cd walletwake
npm install
```

Add `.env.local`:

```env
NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_key
```

Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Demo

*(Video link here)*

---

Built for the Tambo Hackathon.
