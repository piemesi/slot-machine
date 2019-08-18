const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractAppPlugin = new ExtractTextPlugin({
  filename: "[name]-bundle.css",
  allChunks: true
});

const config = {
  // Entry points to the project
  entry: {
    app: [
      // only- means to only hot reload for successful updates
      "webpack/hot/only-dev-server", // HERE
      __dirname + "/src/app/app.js"
    ]
  },
  // Server Configuration options
  devServer: {
    compress: true,
    contentBase: "./src/www", // Relative directory for base of server
    hot: true,
    inline: false,
    port: 3333, // Port Number
    host: "0.0.0.0", // Change to '0.0.0.0' for external facing server
    historyApiFallback: true
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
  mode: "development",
  plugins: [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),

    // Moves files
    new CopyWebpackPlugin([
      { from: "./src/www" }
    ]),
    extractAppPlugin
  ],
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: 3000
  },
  optimization: {
    minimize: false,
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

  } /** @see https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312 */,

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
