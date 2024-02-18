const path = require("node:path");
const { Configuration } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CssExtractPlugin = require("mini-css-extract-plugin");
/**
 * @type {Configuration}
 */
const config = {
  mode: "development",
  entry: "./src/main.ts", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 生成目录
    filename: "[chunkhash].js", // 打包之后的文件
    clean: true,
  },
  // 控制台只
  stats: "errors-only",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
    new CssExtractPlugin(),
  ], // webpack的插件都是class， 都需要new
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader", // 处理ts文件添加loader
        // 支持vue中的ts
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [CssExtractPlugin.loader, "css-loader"], // 从右向左
      },
      {
        test: /\.less/,
        use: [CssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        moment: {
          name: "moment",
          chunks: "all", // 不管异步同步全部拆分
          test: /[\\/]node_modules[\\/]moment[\\/]/,
        },
        common: {
          name: "common",
          chunks: "all",
          minChunks: 2, // 引用次数大于2就会被拆分出来
        },
      },
    },
  },
};

module.exports = config;
