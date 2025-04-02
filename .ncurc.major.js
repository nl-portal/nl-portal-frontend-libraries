const minorConfig = require("./.ncurc.minor");

// bootstrap: https://help.form.io/developers/css-frameworks#bootstrap-5
// @formio/react: https://github.com/formio/react/issues/603

module.exports = {
  ...minorConfig,
  reject: [...minorConfig.reject, "bootstrap", "@formio/react"],
  target: "latest",
};
