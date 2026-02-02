import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  noSilentErrors: true,
  schema: "http://localhost:8080/graphql",
  documents: "./src/{fragments,mutations,queries}/**/*.{ts,tsx}",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
