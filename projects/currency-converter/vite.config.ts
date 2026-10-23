import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command, isPreview }) => {
  const base = command === "build" || isPreview ? "/projects/currency-converter/" : "/";

  return {
    base,

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    plugins: [
      react(),

      VitePWA({
        registerType: "autoUpdate",

        includeAssets: ["favicon.ico"],

        manifest: {
          id: base,
          name: "Currency Converter",
          short_name: "Currency Converter",
          description: "Currency Converter",

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
