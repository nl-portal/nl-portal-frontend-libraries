const minorConfig = require("./.ncurc.minor");

/**
 * bootstrap: version 4 is needed for form IO
 * keycloak-js: has relation with backend
 * vite: vitest support for vite 6 isn't available yet, https://github.com/vitest-dev/vitest/releases/tag/v2.1.7
 * @types/react: react-intl needs type update
 * @types/react-dom: react-intl needs type update
 */
module.exports = {
  ...minorConfig,
  reject: [
    ...minorConfig.reject,
    "bootstrap",
    "keycloak-js",
    "vite",
    "@types/react",
    "@types/react-dom",
  ],
  target: "latest",
};
