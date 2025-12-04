module.exports = {
  cooldown: 1, // 1 day
  dep: ["dev", "prod", "peer"],
  install: "always",
  reject: [],
  root: true,
  target: "patch",
  upgrade: true,
  workspaces: true,
};
