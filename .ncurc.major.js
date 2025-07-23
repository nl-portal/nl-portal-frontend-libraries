const minorConfig = require("./.ncurc.minor");

module.exports = {
  ...minorConfig,
  reject: [...minorConfig.reject, "bootstrap"],
  target: "latest",
};
