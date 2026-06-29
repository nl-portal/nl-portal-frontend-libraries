/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Local dev/preview CSP used to reproduce deployment CSP issues before the
// portal is served by the platform that normally sets these headers.
const enableStrictCsp = false;
const strictCsp = [
  "default-src 'self'",
  "frame-ancestors 'self'",
  "frame-src 'self'",
  "object-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' http://localhost:* https://localhost:* ws://localhost:* wss://localhost:* https:",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https:",
  "worker-src 'self' blob:",
  "base-uri 'self'",
  "manifest-src 'self'",
].join("; ");

export default defineConfig({
  plugins: [
    react(),
    ...(enableStrictCsp
      ? [
          {
            name: "strict-csp",
            configureServer(server) {
              server.middlewares.use((_, res, next) => {
                res.setHeader("Content-Security-Policy", strictCsp);
                next();
              });
            },
            configurePreviewServer(server) {
              server.middlewares.use((_, res, next) => {
                res.setHeader("Content-Security-Policy", strictCsp);
                next();
              });
            },
          },
        ]
      : []),
  ],
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
  html: {
    cspNonce: "##NL_PORTAL_CSP_NONCE##",
  },
});
