/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "api",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "@nl-portal/nl-portal-authentication"],
      output: {
        entryFileNames: "[name].js",
        globals: {
          react: "React",
        },
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            console.log(id);
            return id
              .toString()
              .split("node_modules/.pnpm/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
