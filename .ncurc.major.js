const minorConfig = require("./.ncurc.minor");

module.exports = {
  ...minorConfig,
  reject: [
    ...minorConfig.reject,
    "keycloak-js",
    "@react-keycloak/web",
    "react",
    "react-dom",
    "@types/react",
    "@types/react-dom",
    "bootstrap",
    "@formio/react",
  ],
  target: "latest",
};
