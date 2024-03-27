module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint", "prettier --check"],
  "**/*.{ts,tsx}": [
    () => "tsc --noEmit --project ./packages/user-interface/tsconfig.json",
  ],
  "*.{css,scss}": ["stylelint --allow-empty-input", "prettier --check"],
};
