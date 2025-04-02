const minorConfig = require("./.ncurc.minor");

module.exports = {
  ...minorConfig,
  reject: [...minorConfig.reject, "bootstrap", "@formio/react"],
  target: "latest",
};
