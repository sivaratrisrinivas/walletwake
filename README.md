# ⚰️ WalletWake - The Impulse Buy Funeral Service

**"The UI Strikes Back" Hackathon Submission**

WalletWake is an AI-powered financial intervention agent. Instead of making it easy to buy things, it makes it incredibly painful (and hilarious). It uses **Generative UI**, **Voice Synthesis**, and **Multimodal Reasoning** to roast your bad spending habits before you click "Checkout."

![Demo Screenshot](./public/demo-screenshot.png)

## 🚀 Key Features

* **Generative UI (Tambo SDK):** The interface is not static. If you express a desire to buy something, the AI generates a custom **"Funeral Ticket"** or **"Roast Receipt"** component on the fly, populated with unique reasons why you shouldn't buy it.
* **Multimodal Shame (Gemini 1.5 Flash + Imagen 3):**
    * **Text:** Generates savage, context-aware insults about your purchase.
    * **Vision:** Generates a "cinematic gloom" image of the product you're wasting money on using the `gemini-2.5-flash-image` model.
* **Audio Eulogies (ElevenLabs Turbo v2.5):** * When you enter the "Funeral Mode," the app generates a unique, text-to-speech eulogy for your money using a custom "Disappointed Narrator" voice.
    * Powered by low-latency streaming for instant playback.
* **Impulse Friction:** A 48-hour countdown timer that physically prevents you from accessing the "Buy" link until the urge passes.

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router)
* **AI Agent:** Tambo SDK (for Tool Calling & Generative UI)
* **LLM & Vision:** Google Gemini 1.5 Flash & Gemini 2.5 (Nano)
* **Voice AI:** ElevenLabs (Turbo v2.5 Model)
* **Styling:** TailwindCSS + Lucide Icons

## ⚙️ Setup & Installation

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/yourusername/walletwake.git](https://github.com/yourusername/walletwake.git)
    cd walletwake
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    npm install @google/genai
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root:
    ```env
    # Tambo (Generative UI)
    NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_key

    # Google Gemini (Text & Image Gen)
    GEMINI_API_KEY=your_google_ai_studio_key

    # ElevenLabs (Voice)
    ELEVENLABS_API_KEY=your_elevenlabs_key
    ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

5.  **Experience the Shame:**
    * Open `http://localhost:3000`.
    * Search for "PS5" or "Gucci Slides".
    * Open the Chat Bubble and ask: *"Analyze the cost of an iPhone 16".*
    * Click "Enter Funeral Mode" and turn your sound on.

## 🧠 How It Works (The "UI Strikes Back" Logic)

1.  **User Intent:** The user types "I want a PS5" in the chat.
2.  **Tool Selection:** The Tambo Agent analyzes the intent and selects the `funeral-ticket` tool.
3.  **Generative Props:** The LLM fills the component props (`price`, `reason`, `productTitle`) based on its knowledge of the product.
4.  **Component Rendering:** The React component is rendered inside the chat stream.
5.  **Multimodal Expansion:** When the user accepts the ticket, Gemini generates a custom image, and ElevenLabs streams a generated audio eulogy.

## 🏆 Hackathon Tracks
* **Best Use of Generative UI**
* **Most Creative AI Agent**