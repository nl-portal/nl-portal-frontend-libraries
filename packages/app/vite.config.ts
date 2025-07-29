/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("lodash-es")) return "lodash-es";
          if (id.includes("lodash")) return "lodash";
          if (id.includes("inputmask")) return "inputmask";
          if (id.includes("acorn")) return "acorn";
          if (id.includes("@formio/core")) return "formio-core";
          if (id.includes("@formio/react")) return "formio-react";
          if (id.includes("@formio/js/lib")) return "formio-js-lib";
          if (id.includes("@formio/js")) return "formio-js";
          if (id.includes("@formio/protected-eval"))
            return "formio-protected-eval";
        },
      },
    },
    commonjsOptions: { transformMixedEsModules: true },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
