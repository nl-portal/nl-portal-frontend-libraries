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
      name: "user-interface",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-intl",
        "react-router-dom",
        "@apollo/client",
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
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    server: {
      deps: {
        inline: [
          "@gemeente-denhaag/badge-counter",
          "@gemeente-denhaag/button-link",
          "@gemeente-denhaag/form-field-error-message",
          "@gemeente-denhaag/form-field",
          "@gemeente-denhaag/form-label",
          "@gemeente-denhaag/link-button",
          "@gemeente-denhaag/radio-button",
          "@gemeente-denhaag/status-badge",
          "@gemeente-denhaag/text-input",
        ],
      },
    },
  },
});
