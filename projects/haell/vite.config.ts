import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/projects/haell/",
  plugins: [react(), tailwindcss()],
  // server: {
  //   allowedHosts: ["highest-exec-nokia-court.trycloudflare.com"],
  // },
}));
