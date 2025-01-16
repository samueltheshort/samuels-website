"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const browserslistToEsbuild = require("browserslist-to-esbuild");
const esbuildLoader = require("esbuild-loader");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const crypto = require("node:crypto");
const path = require("node:path");
const readPkgUp = require("read-pkg-up");
const webpack = require("webpack");
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");
const monorepo = require("../core/monorepo.js");
const config = require("../core/config.js");
const aliases = require("../core/aliases.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const ReactRefreshWebpackPlugin__default = /* @__PURE__ */ _interopDefault(ReactRefreshWebpackPlugin);
const browserslistToEsbuild__default = /* @__PURE__ */ _interopDefault(browserslistToEsbuild);
const ForkTsCheckerPlugin__default = /* @__PURE__ */ _interopDefault(ForkTsCheckerPlugin);
const HtmlWebpackPlugin__default = /* @__PURE__ */ _interopDefault(HtmlWebpackPlugin);
const MiniCssExtractPlugin__default = /* @__PURE__ */ _interopDefault(MiniCssExtractPlugin);
const crypto__default = /* @__PURE__ */ _interopDefault(crypto);
const path__default = /* @__PURE__ */ _interopDefault(path);
const readPkgUp__default = /* @__PURE__ */ _interopDefault(readPkgUp);
const resolveBaseConfig = async (ctx) => {
  const target = browserslistToEsbuild__default.default(ctx.target);
  return {
    experiments: {
      topLevelAwait: true
    },
    entry: {
      main: [`./${ctx.entry}`]
    },
    resolve: {
      alias: {
        react: getModulePath("react"),
        "react-dom": getModulePath("react-dom"),
        "styled-components": getModulePath("styled-components"),
        "react-router-dom": getModulePath("react-router-dom")
      },
      extensions: [".js", ".jsx", ".react.js", ".ts", ".tsx"]
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: require.resolve("esbuild-loader"),
          options: {
            loader: "tsx",
            target,
            jsx: "automatic"
          }
        },
        {
          test: /\.(js|jsx|mjs)$/,
          use: {
            loader: require.resolve("esbuild-loader"),
            options: {
              loader: "jsx",
              target,
              jsx: "automatic"
            }
          }
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.css$/i,
          use: [require.resolve("style-loader"), require.resolve("css-loader")]
        },
        {
          test: /\.(svg|eot|otf|ttf|woff|woff2)$/,
          type: "asset/resource"
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 1e3
            }
          }
        },
        {
          test: /\.(mp4|webm)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 1e4
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin__default.default({
        inject: true,
        template: path__default.default.resolve(ctx.runtimeDir, "index.html")
      }),
      new webpack.DefinePlugin(
        Object.entries(ctx.env).reduce((acc, [key, value]) => {
          acc[`process.env.${key}`] = JSON.stringify(value);
          return acc;
        }, {})
      ),
      ctx.tsconfig && new ForkTsCheckerPlugin__default.default({
        typescript: {
          configFile: ctx.tsconfig.path,
          configOverwrite: {
            compilerOptions: {
              sourceMap: ctx.options.sourcemaps
            }
          }
        }
      })
    ].filter(Boolean)
  };
};
const resolveDevelopmentConfig = async (ctx) => {
  const baseConfig = await resolveBaseConfig(ctx);
  const monorepo$1 = await monorepo.loadStrapiMonorepo(ctx.cwd);
  return {
    ...baseConfig,
    cache: {
      type: "filesystem",
      // version cache when there are changes to aliases
      buildDependencies: {
        config: [__filename]
      },
      version: crypto__default.default.createHash("md5").update(Object.entries(baseConfig.resolve.alias ?? {}).join()).digest("hex")
    },
    resolve: {
      ...baseConfig.resolve,
      alias: {
        ...baseConfig.resolve.alias,
        ...aliases.getMonorepoAliases({ monorepo: monorepo$1 })
      }
    },
    entry: {
      ...baseConfig.entry,
      main: [
        `${require.resolve("webpack-hot-middleware/client")}?path=/__webpack_hmr`,
        ...baseConfig.entry.main
      ]
    },
    stats: "errors-warnings",
    mode: "development",
    devtool: "inline-source-map",
    output: {
      filename: "[name].js",
      path: ctx.distPath,
      publicPath: ctx.basePath
    },
    infrastructureLogging: {
      level: "error"
    },
    plugins: [
      ...baseConfig.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin__default.default()
    ]
  };
};
const resolveProductionConfig = async (ctx) => {
  const target = browserslistToEsbuild__default.default(ctx.target);
  const baseConfig = await resolveBaseConfig(ctx);
  return {
    ...baseConfig,
    stats: "errors-only",
    mode: "production",
    bail: true,
    devtool: ctx.options.sourcemaps ? "source-map" : false,
    output: {
      path: ctx.distPath,
      publicPath: ctx.basePath,
      // Utilize long-term caching by adding content hashes (not compilation hashes)
      // to compiled assets for production
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[name].[contenthash:8].chunk.js"
    },
    optimization: {
      minimize: ctx.options.minify,
      minimizer: [
        new esbuildLoader.ESBuildMinifyPlugin({
          target,
          css: true
          // Apply minification to CSS assets
        })
      ],
      moduleIds: "deterministic",
      runtimeChunk: true
    },
    plugins: [
      ...baseConfig.plugins,
      new MiniCssExtractPlugin__default.default({
        filename: "[name].[chunkhash].css",
        chunkFilename: "[name].[chunkhash].chunkhash.css",
        ignoreOrder: true
      }),
      ctx.options.stats && new webpackBundleAnalyzer.BundleAnalyzerPlugin()
      // TODO: find out if this is an actual issue or just a ts bug
    ].filter(Boolean)
  };
};
const USER_CONFIGS = ["webpack.config.js", "webpack.config.mjs", "webpack.config.ts"];
const mergeConfigWithUserConfig = async (config$1, ctx) => {
  const userConfig = await config.getUserConfig(USER_CONFIGS, ctx);
  if (userConfig) {
    if (typeof userConfig === "function") {
      const webpack2 = await import("webpack");
      return userConfig(config$1, webpack2);
    }
    ctx.logger.warn(
      `You've exported something other than a function from ${path__default.default.join(
        ctx.appDir,
        "src",
        "admin",
        "webpack.config"
      )}, this will ignored.`
    );
  }
  return config$1;
};
const getModulePath = (mod) => {
  const modulePath = require.resolve(mod);
  const pkg = readPkgUp__default.default.sync({ cwd: path__default.default.dirname(modulePath) });
  return pkg ? path__default.default.dirname(pkg.path) : modulePath;
};
exports.mergeConfigWithUserConfig = mergeConfigWithUserConfig;
exports.resolveDevelopmentConfig = resolveDevelopmentConfig;
exports.resolveProductionConfig = resolveProductionConfig;
//# sourceMappingURL=config.js.map
