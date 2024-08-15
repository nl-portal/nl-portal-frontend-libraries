import globals from "globals";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
//import hooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

// Add eslint-plugin-react-hooks back when this issue is solved: https://github.com/facebook/react/issues/28313

const reactRule = {
  "react/react-in-jsx-scope": "off",
  "react-hooks/exhaustive-deps": "off",
};

export default [
  {
    ignores: [
      "**/node_modules/",
      "**/build/",
      "**/dist/",
      "**/coverage/",
      "**/generated/",
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs"],
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      //'react-hooks': hooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...jsxA11yPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      //...hooksPlugin.configs.recommended.rules,
      ...reactRule,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      import: importPlugin,
      react: reactPlugin,
      //'react-hooks': hooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...jsxA11yPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      //...hooksPlugin.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      ...reactRule,
    },
  },
];
