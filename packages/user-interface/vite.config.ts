/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default defineConfig({
  plugins: [peerDepsExternal({ includeDependencies: true }), react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "user-interface",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
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
          "@gemeente-denhaag/button-link",
          "@gemeente-denhaag/form-field-error-message",
          "@gemeente-denhaag/form-field",
          "@gemeente-denhaag/form-label",
          "@gemeente-denhaag/text-input",
        ],
      },
    },
  },
});
