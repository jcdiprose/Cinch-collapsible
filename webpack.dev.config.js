const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/demo.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /(\.ts|\.tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};

module.exports = config;
