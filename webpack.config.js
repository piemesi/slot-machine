const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const extractAppPlugin = new ExtractTextPlugin({
  filename: "[name]-bundle.css",
  allChunks: true
});

const config = {
  // Entry points to the project
  entry: {
    app: [
      __dirname + "/src/app/app.js"
    ]
  },
  externals: {
    "react/addons": true
  },
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "build"), // Path of output file
    filename: `[name].js`, //     filename: '[name].[contenthash:8].js', //for prod
    chunkFilename: "[name].js",
    publicPath: "/"
  },
  mode: "production", // 'production'
  plugins: [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),

    // Moves files
    new CopyWebpackPlugin([
      { from: "./src/www" }
    ]),
    extractAppPlugin
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        // cache: true
        // minify: true,
        // parallel: true
        extractComments: true,
        uglifyOptions: {
          ecma: 8,
          warnings: false,
          minimize: true,
          compress: true,
          // compress: {inline: false},

          output: {
            comments: false,
            beautify: false,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          // keep_classnames: undefined,
          // keep_fnames: false,
          safari10: false,
        },
      }),
    ],
    runtimeChunk: false,
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: Infinity,
      // maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: module => module.resource && module.resource.indexOf("node_modules") !== -1,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,

          chunks: "async",
          name: "common"
        }
      }
    }

  },
  resolve: {
    alias: {
      apputils: path.resolve(__dirname, "./src/utils"),
      approot: path.resolve(__dirname, "./src/app")
    },

    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss"],

    modules: [
      path.join(__dirname, "node_modules")
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          cacheDirectory: false
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractAppPlugin.extract({
          fallback: "style-loader",
          // use: ['style-loader', 'css-loader'],
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractAppPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
          publicPath: "./"
        })
      },
      {
        test: /\.svg/,
        loader: "url-loader?limit=26000&mimetype=image/svg+xml"
      },

      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg)$/,
        loader: "file?name=public/fonts/[name].[ext]"
      }
    ]
  }
};

module.exports = config;
