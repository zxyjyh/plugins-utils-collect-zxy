// import * as webpack from "webpack";

const path = require("path");

require("webpack-dev-server");

// import "webpack-dev-server";

const configCommon = {
  entry: {
    app: path.join(__dirname, "../src/index.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        resourceQuery: /type=style/,
        sideEffects: true,
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              babelParserPlugins: [
                "jsx",
                "classProperties",
                "decorators-legacy",
              ],
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: path.join(__dirname, "../babel.config.js"),
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: path.join(__dirname, "../babel.config.js"),
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ["\\.vue$"],
              happyPackMode: false,
            },
          },
        ],
      },
      {
        test: /\.tsx$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: path.join(__dirname, "../babel.config.js"),
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsxSuffixTo: ["\\.vue$"],
              happyPackMode: false,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".wasm"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@hooks": path.resolve(__dirname, "../packages/hooks"),
      "@components": path.resolve(__dirname, "../packages/components"),
      "@plugins": path.resolve(__dirname, "../packages/plugins"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "../example"), // 修改默认静态服务访问public目录
    },
  },
};

module.exports = configCommon;
