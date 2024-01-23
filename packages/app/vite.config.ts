/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "html-inject-data",
      enforce: "post",
      transformIndexHtml(html) {
        const regex = /<(style|script|link) (.*)>/gi;
        const replacer = (_, p1, p2) => {
          // add nonce on style and script tags without a source (inline scripts and styles)
          if (
            (p1 === "style" && !p2.includes("src=")) ||
            (p1 === "script" && !p2.includes("src="))
          ) {
            p2 = `nonce="NjUwYzhhYzgtNzlmZC00NDVhLThhMDAtMmU4YjFmNTcyMDQ4" ${p2}`;
          }

          return `<${p1} ${p2}>`;
        };

        return html.replace(regex, replacer);
      },
    },
  ],
  build: {
    commonjsOptions: {
      include: [/api/, /node_modules/],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
