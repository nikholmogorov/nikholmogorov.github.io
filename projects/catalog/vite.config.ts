import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import sassDts from "vite-plugin-sass-dts";

export default defineConfig({
    base: '/projects/catalog/',
    plugins: [
        react(),
        sassDts({
            enabledMode: ["development", "production"],
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@utils": path.resolve(__dirname, "./src/utils"),
        },
    },
});
