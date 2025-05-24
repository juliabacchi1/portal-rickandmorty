import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss"; // Aqui é onde o Tailwind é importado

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [react()],
});
