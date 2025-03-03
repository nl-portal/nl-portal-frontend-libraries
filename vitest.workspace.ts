import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./packages/authentication/vite.config.ts",
  "./packages/localization/vite.config.ts",
  "./packages/api/vite.config.ts",
  "./packages/user-interface/vite.config.ts",
  "./packages/app/vite.config.ts",
]);
