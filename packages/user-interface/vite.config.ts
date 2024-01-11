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
      ],
      output: {
        entryFileNames: "[name].js",
        globals: {
          react: "React",
        },
      },
    },
  },
  // resolve: {
  //   alias: {
  //     "@nl-portal/nl-portal-api": resolve("../api/dist/index.ts"),
  //     "@nl-portal/nl-portal-authentication": resolve(
  //       "../authentication/dist/index.ts"
  //     ),
  //     "@nl-portal/nl-portal-localization": resolve(
  //       "../localization/dist/index.ts"
  //     ),
  //   },
  // },
}));
