import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => ({
  plugins: [react(), dts()],
  build: {
    minify: mode === "production",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "authentication",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "@react-keycloak/web"],
      output: {
        entryFileNames: "[name].js",
        globals: {
          react: "React",
        },
      },
    },
  },
}));
