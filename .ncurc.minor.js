const patchConfig = require("./.ncurc.patch");

/**
 * React-intl: Support for React 19 is removed in minor release 7.1.0. New MR is available: https://github.com/formatjs/formatjs/pull/4797
 * formiojs: App breaks when upgrading minor
 **/

module.exports = {
  ...patchConfig,
  reject: [...patchConfig.reject, "react-intl", "formiojs"],
  target: "minor",
};
