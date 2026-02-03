import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "node:url"; // ADDED: Needed to build an absolute path from import.meta.url

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), // ADDED: Map @ -> src for imports like "@/components/..."
    },
  },
});
