import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command, isPreview }) => {
  const base = command === "build" || isPreview ? "/projects/catstagram/" : "/";
  return {
    base,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@api": path.resolve(__dirname, "./src/api"),
      },
    },
    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: "autoUpdate",

        includeAssets: ["favicon.svg", "light.svg", "dark.svg", "apple-touch-icon-180x180.png"],

        manifest: {
          name: "Catstagram",
          short_name: "Catstagram",
          description: "Catstagram",
          display: "standalone",
          start_url: base,
          scope: base,
          theme_color: "#000000",
          background_color: "#ffffff",

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

        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/cdn\d*\.thecatapi\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "cat-images",

                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },

                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
    ],
    staged: {
      "*": "vp check --fix",
    },
    fmt: {},
    lint: {
      jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
      rules: { "vite-plus/prefer-vite-plus-imports": "error" },
      options: { typeAware: true, typeCheck: true },
    },
  };
});
