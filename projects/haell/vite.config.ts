import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command, isPreview }) => {
  const base = command === "build" || isPreview ? "/projects/haell/" : "/";

  const cloudflareHost = "highest-exec-nokia-court.trycloudflare.com";

  return {
    base,

    // server: {
    //   allowedHosts: [cloudflareHost],
    // },

    preview: {
      allowedHosts: [cloudflareHost],
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: "autoUpdate",

        includeAssets: ["favicon.ico"],

        manifest: {
          id: base,
          name: "haell",
          short_name: "haell",
          description: "haell",

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
