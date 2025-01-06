const patchConfig = require("./.ncurc.patch");

// Support for React 19 is removed in minor release 7.1.0. New MR is available: https://github.com/formatjs/formatjs/pull/4797

module.exports = {
  ...patchConfig,
  reject: [...patchConfig.reject, "react-intl"],
  target: "minor",
};
