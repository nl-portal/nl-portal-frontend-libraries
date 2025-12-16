module.exports = {
  cooldown: 1, // 1 day
  dep: ["dev", "prod", "peer"],
  install: "always",
  reject: [
    "@apollo/client",
    "graphql",
    "@graphql-codegen/cli",
    "@graphql-codegen/typescript-operations",
    "@graphql-codegen/typescript-react-apollo",
    "eslint",
    "eslint-plugin-react-hooks",
  ],
  root: true,
  target: "patch",
  upgrade: true,
  workspaces: true,
};
