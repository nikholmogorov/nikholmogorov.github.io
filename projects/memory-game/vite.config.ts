import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command, isPreview }) => {
  const base = command === "build" || isPreview ? "/projects/memory-game/" : "/";

  return {
    base,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@images": path.resolve(__dirname, "./src/assets/images"),
      },
    },

    plugins: [
      react(),

      VitePWA({
        registerType: "autoUpdate",

        includeAssets: ["favicon.ico"],

        manifest: {
          id: base,
          name: "Memory Game",
          short_name: "Memory Game",
          description: "Memory Game",

          theme_color: "#000000",
          background_color: "#ffffff",
          display: "standalone",

          start_url: base,
          scope: base,

          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "maskable-icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
      }),
    ],
  };
});
