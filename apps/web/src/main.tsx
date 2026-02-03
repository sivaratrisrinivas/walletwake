import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TamboProvider } from "@tambo-ai/react"; // ADDED: Provides Tambo context/hooks/UI to the React tree
import "./index.css";
import "./app/globals.css"; // ADDED: Tambo CLI added this (Tailwind v4 CSS-first globals) so UI components render styled
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TamboProvider
      apiKey={import.meta.env.VITE_TAMBO_API_KEY} // ADDED: Vite-exposed env var (must be VITE_ prefixed)
      components={[]} // ADDED: We'll register custom components later; prebuilt chat UI can work without custom components
    >
      <App />
    </TamboProvider>
  </StrictMode>
);
