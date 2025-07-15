/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

const externals = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

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
      external: externals,
      output: {
        entryFileNames: "[name].js",
        globals: {
          react: "React",
        },
      },
    },
    commonjsOptions: { transformMixedEsModules: true },
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
          "@gemeente-denhaag/status-badge",
          "@gemeente-denhaag/text-input",
        ],
      },
    },
  },
});
