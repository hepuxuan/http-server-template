const webpack = require("webpack");
const path = require("path");

/*
 * We've enabled Postcss, autoprefixer and precss for you. This allows your app
 * to lint  CSS, support variables and mixins, transpile future CSS syntax,
 * inline images, and more!
 *
 * To enable SASS or LESS, add the respective loaders to module.rules
 *
 * https://github.com/postcss/postcss
 *
 * https://github.com/postcss/autoprefixer
 *
 * https://github.com/jonathantneal/precss
 *
 */

const autoprefixer = require("autoprefixer");
const precss = require("precss");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const babelConfig = require("./.babelrc.json");
const _ = require("lodash");

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].[chunkhash].css"
    }),
    function OutputHash() {
      this.plugin("done", stats => {
        const assetsByChunkName = stats.toJson().assetsByChunkName;
        for (let key in assetsByChunkName) {
          if (key === "vendors") {
            assetsByChunkName[key] = { js: assetsByChunkName[key] };
          } else {
            const assetsList = assetsByChunkName[key];
            const css = _.find(assetsList, s => /\.(css)$/.test(s));
            const js = _.find(assetsList, s => /\.(js)$/.test(s));

            assetsByChunkName[key] = {
              css,
              js
            };
          }
        }

        fs.writeFileSync(
          path.join(__dirname, "./assetsInfo.json"),
          JSON.stringify(assetsByChunkName)
        );
      });
    }
  ],
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "../src")],
        loader: "babel-loader",
        exclude: /node_modules\//,
        options: babelConfig,

        test: /\.js$/
      },
      {
        test: /\.css$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              localIdentName: "[hash:base64]"
            }
          },
          {
            loader: "postcss-loader",

            options: {
              plugins: function() {
                return [precss, autoprefixer];
              }
            }
          }
        ]
      }
    ]
  },

  entry: {
    user: path.resolve(__dirname, "../src/client/user.js")
  },

  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "../public/dist"),
    publicPath: "/user/dist"
  },

  mode: "production",

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      },

      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true
    },
    minimizer: [
      new UglifyJSPlugin({
        test: /\.js(\?.*)?$/i,
        uglifyOptions: {
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }
      })
    ]
  }
};
