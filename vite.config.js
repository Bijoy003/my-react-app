import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Vitest reads this key; Vite ignores it. Tests run in jsdom so the browser
  // APIs React touches exist, and every *.test.* file next to its subject.
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    include: ["src/**/*.test.{js,jsx,ts,tsx}"],
  },
});
