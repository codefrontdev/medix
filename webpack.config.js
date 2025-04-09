/** @format */

const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin"); // Optional for path mapping
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { plugin } = require("mongoose");

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: [options.entry],
    target: "node",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
    externals: [nodeExternals()],
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/resources/email-templates"),
            to: path.resolve(__dirname, "dist/resources/email-templates"),
          },
        ],
      }),
    ],
    resolve: {
      extensions: [".ts", ".js"],
      plugins: [new TsConfigPathsPlugin()],
    },
    optimization: {
      minimize: false,
    },
  };
};
