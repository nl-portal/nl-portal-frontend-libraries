const minorConfig = require("./.ncurc.minor");

module.exports = {
  ...minorConfig,
  reject: [
    ...minorConfig.reject,
    "keycloak-js",
    "@react-keycloak/web",
    "react",
    "react-dom",
    "react-router-dom",
    "@types/react",
    "@types/react-dom",
    "@types/react-router-dom",
    "bootstrap",
    "@formio/react",
  ],
  target: "latest",
};
