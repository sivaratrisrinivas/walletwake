# ⚰️ WalletWake — The Impulse Buy Funeral Service

**"The UI Strikes Back" Hackathon Submission**

<p align="center">
  <img src="./public/walletwake.png" alt="WalletWake" width="640" />
</p>

---

## What

WalletWake is an app that gets between you and the "buy now" button. You say what you want (in chat or via search). The app shows a **funeral** for that purchase: the price in ramen packs, coffees, hours of work, plus a spoken eulogy and a gloomy picture of the thing. Then a **48-hour wait**. After that you can buy with a clear head or walk away.

---

## Why

Impulse buys feel good for five minutes. This adds friction so you see the real cost and hear it roasted out loud. If you still want it after 48 hours, fine — that’s a choice, not a reflex.

---

## How

**Using it**

- **Search:** Use the main bar, pick a product, click **Select** → you get a funeral ticket.
- **Chat:** Open the chat bubble and say e.g. *"I want a PS5"* or *"Break down the cost of an iPhone"*. The app shows a **Funeral Ticket** or **Roast Receipt** with a reason not to buy.
- **Enter Funeral Mode:** Click **Enter Funeral Mode** on the ticket. You get a full-screen funeral: guilt math (price as ramen, coffee, etc.), a 48-hour countdown, a custom gloomy image of the product, and a spoken eulogy. Turn sound on.
- **After 48 hours:** A "Clarity" screen lets you buy or close. Or use **Skip 48h** in dev to test.

**Running it**

1. Clone the repo, then:
   ```bash
   cd walletwake
   npm install
   ```
2. Add a `.env.local` in the project root:
   ```env
   NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_key
   GEMINI_API_KEY=your_google_ai_studio_key
   ELEVENLABS_API_KEY=your_elevenlabs_key
   ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000). Search for "PS5" or "Gucci", or ask in chat for a cost breakdown, then click **Enter Funeral Mode** and turn sound on.

---

## What’s inside (plain terms)

- **Chat + search:** You say what you want; the app decides whether to show a Funeral Ticket or Roast Receipt and fills in price, product name, and a reason not to buy.
- **Funeral view:** Custom image of the product (gloomy style), price converted to ramen/coffee/work, 48-hour timer, and a spoken eulogy.
- **Tech:** Next.js, Tambo (chat + dynamic UI), Google (text + images), ElevenLabs (voice), Tailwind.

---

## Hackathon tracks

- Best Use of Generative UI  
- Most Creative AI Agent  
