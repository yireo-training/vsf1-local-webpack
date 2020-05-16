/**
 * Custom Webpack 4 configuration for Vue Storefront local development
 */

const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require("autoprefixer");

/* 
import config from 'config';
fs.writeFileSync(
    path.resolve(__dirname, './config.json'),
    JSON.stringify(config)
  )
*/

const appRoot = __dirname;

const themesRoot = path.resolve(appRoot, "src/themes");
const themeRoot = require(path.resolve(appRoot, "core/build/theme-path")); // @todo: Maybe replace this with your hard-coded theme path?
//const themeRoot = path.resolve(themesRoot, "default"));
const themeResources = themeRoot + "/resource";
const themeCSS = themeRoot + "/css";
const themeApp = themeRoot + "/App.vue";

const postcssConfig = {
  loader: "postcss-loader",
  options: {
    ident: "postcss",
    plugins: loader => [
      require("postcss-flexbugs-fixes"),
      require("autoprefixer")({
        flexbox: "no-2009"
      })
    ]
  }
};

let webpackConfig = {
  mode: "development",
  watch: true,
  entry: "./core/client-entry.ts",
  output: {
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          postcss: [autoprefixer()]
        }
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          path.resolve(appRoot, "node_modules/@vue-storefront"),
          path.resolve(appRoot, "src"),
          path.resolve(appRoot, "core")
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader", postcssConfig]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", postcssConfig, "sass-loader"]
      },
      {
        test: /\.sass$/,
        use: [
          "vue-style-loader",
          "css-loader",
          postcssConfig,
          {
            loader: "sass-loader",
            options: {
              indentedSyntax: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: "url-loader?importLoaders=1&limit=10000"
      },
      {
        test: /\.(graphqls|gql)$/,
        loader: ["graphql-tag/loader"]
      }
    ]
  },
  resolveLoader: {
    modules: ["node_modules", themesRoot]
  },
  resolve: {
    modules: ["node_modules", themesRoot],
    extensions: [".js", ".vue", ".gql", ".graphqls", ".ts", ".d.ts"],
    alias: {
      // Main aliases
      config: path.resolve(appRoot, "core/build/config.json"),
      src: path.resolve(appRoot, "src"),

      // Theme aliases
      theme: themeRoot,
      "theme/app": themeApp,
      "theme/css": themeCSS,
      "theme/resource": themeResources,

      // Backward compatible
      "@vue-storefront/core/lib/store/multistore": path.resolve(
        appRoot,
        "core/lib/multistore.ts"
      ),
      "src/modules/order-history/components/UserOrders": path.resolve(
        appRoot,
        "core/modules/order/components/UserOrdersHistory"
      ),
      "@vue-storefront/core/modules/social-share/components/WebShare": path.resolve(
        appRoot,
        "src/themes/default/components/theme/WebShare.vue"
      ),
      "@vue-storefront/core/helpers/initCacheStorage": path.resolve(
        appRoot,
        "core/lib/storage-manager.ts"
      ),
      "create-api": path.resolve(appRoot, "core/create-api-client.js")
    }
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    contentBase: path.join(__dirname, 'public')
  },
  plugins: [
    new VueLoaderPlugin(),
    new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: false
      }),
    ],
  }
};

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))
webpackConfig = Object.assign(webpackConfig, extendedConfig);

module.exports = webpackConfig;
