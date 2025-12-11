import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  noSilentErrors: true,
  schema: "http://localhost:8080/graphql",
  documents: "./src/{fragments,mutations,queries}/**/*.{ts,tsx}",
  generates: {
    "src/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
