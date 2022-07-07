const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackCommon = require("./webpack.common");
const { VueLoaderPlugin } = require("vue-loader");

const devConfig = merge(webpackCommon, {
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: "vue-style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: path.resolve(__dirname, "../example/index.html"),
      title: "example",
    }),
    new VueLoaderPlugin(),
  ],
});

module.exports = devConfig;
