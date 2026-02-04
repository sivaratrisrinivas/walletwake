# WalletWake ⚰️💸
> *The Impulse Buy Funeral Service.*

**Winner of the "Financial Responsibility" Award (hopefully!) at Tambo Hackathon.**

WalletWake is a Generative UI application that intercepts your impulse buying habits. Instead of a "Buy Now" button, we give your wallet a funeral. It uses **AI orchestration** to detect purchase intent and renders a "Financial Funeral" interface to help you visualize the cost in real terms (Ramen packs, hours of labor, etc.).

## 🎥 Demo
*(Link to your 2-minute video here)*

## 🛠️ Tech Stack & Tambo Compliance
This project is built 100% on the **Tambo React SDK**.

* **Generative UI:** We use `useTamboThread` to power a Chat Agent that detects spending intent.
* **Component Registration:** Custom components (`funeral-ticket`) are registered in `providers.tsx` with Zod schemas, allowing the AI to dynamically render them during conversation.
* **Adaptive UX:** The app transitions between "Search Mode" (Intent), "Funeral Mode" (Friction), and "Clarity Mode" (Reward) based on user state.

## 🚀 Features

### 1. The Funeral Agent (Generative UI)
The `WalletWake Agent` sits in the app. If you tell it *"I want to buy Sony Headphones"*, it doesn't just reply with text. It analyzes the price and **generatively renders** a `FuneralTicket` component, inviting you to process your grief before you spend.

### 2. The Impulse Funeral
Once activated, the app locks into **Funeral Mode** (Dark Theme):
* **The Tombstone:** Visualizes the item you are about to "kill" your savings for.
* **Ramen Math:** Converts the price into tangible goods (e.g., "$350 = 700 packs of Ramen").
* **The Timer:** Enforces a strict 48-hour cooling-off period.

### 3. Clarity Mode (The Reward)
If you wait 48 hours (or use the hidden Dev Skip button), the app resurrects into **Clarity Mode** (Light Theme), validating your decision to purchase with a clear mind.

## 📦 Installation

1.  Clone the repo:
    ```bash
    git clone [https://github.com/yourusername/walletwake.git](https://github.com/yourusername/walletwake.git)
    cd walletwake
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment:
    Create `.env.local`:
    ```env
    # Optional: For real eBay Data (Mock data used by default for stability)
    EBAY_CLIENT_ID=...
    EBAY_CLIENT_SECRET=...
    
    # Required: Tambo API Key
    NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_key
    ```

4.  Run the funeral:
    ```bash
    npm run dev
    ```

## 🧛‍♂️ Hackathon Notes for Judges

* **Generative Trigger:** Open the Chat Bubble (bottom right) and type *"I want to buy a PS5"*. The AI will render the component.
* **Manual Trigger:** You can also search for items using the main input to trigger the flow manually.
* **Demo Speed:** We included a hidden **"DEMO: SKIP 48H"** button (bottom right in Funeral Mode) so you don't have to wait 2 days to see the success state!

---
Built with 🖤 for the Tambo Hackathon.