const prodConfig = require("./webpack.prod");
const { name } = require("../package.json");

// enum LIBARY_TARGET {
//   umd = "umd",
//   cjs = "cjs",
//   esm = "esm",
// }

const targetUMD = {
  ...prodConfig,
  output: {
    ...prodConfig.output,
    filename: "umd/index.js",
    library: {
      name,
      type: "umd",
    },
  },
};

const targetCJS = {
  ...prodConfig,
  output: {
    ...prodConfig.output,
    filename: "cjs/index.js",
    library: {
      name,
      type: "commonjs",
    },
  },
};

const targetESM = {
  ...prodConfig,
  experiments: {
    outputModule: true,
  },
  output: {
    ...prodConfig.output,
    filename: "esm/index.js",
    library: {
      type: "module",
      export: "default",
    },
  },
};

const libraryTargetConfig = new Map([
  ["umd", targetUMD],
  ["cjs", targetCJS],
  ["esm", targetESM],
]);

module.exports = libraryTargetConfig;
