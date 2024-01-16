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
      name: "localization",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@nl-portal/nl-portal-api",
        "@nl-portal/nl-portal-authentication",
        "@nl-portal/nl-portal-localization",
        "@react-keycloak/web",
      ],
      output: {
        entryFileNames: "[name].js",
        globals: {
          react: "React",
        },
      },
    },
  },
  test: {
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
});
