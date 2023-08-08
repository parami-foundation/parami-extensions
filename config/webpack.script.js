'use strict';
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const PATHS = require('./paths');

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const config = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  return {
    entry: "./src/Twitter/index.tsx",
    mode: "production",
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                compilerOptions: { noEmit: false },
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            { loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: isDevelopment
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment
              }
            }
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            {
              loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment
              }
            }
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
    },
    output: {
      filename: "twitter.js",
      path: PATHS.build,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      })
    ],
    // optimization: {
    //   minimize: true,
    //   minimizer: [new TerserPlugin()],
    // },
  };
}

module.exports = config;
