require('webpack');
const path = require('path');

module.exports = (env, argv) => {

  const config = argv.mode === 'development' ? devConfig() : prodConfig();

  return {
    entry: {
      main: './assets/main.ts',
    },

    output: {
      path: path.resolve(__dirname, 'public'),
      filename: "build/js/[name].js",
      publicPath: '/',
      clean: {
        keep: /index\.html|index\.php/,
      }
    },
    // file resolutions
    resolve: {
      extensions: [ '.ts', '.js' ],
    },

    // loaders
    module: {
      rules: [
        {
          test: /\.tsx?/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ]
    },

    // Push de la config prod ou dev
    ...config
  }
};


/**
 * Development mode configuration
 * @type {{}}
 */
const devConfig = () => {

  return {
    target: 'web',
    mode: 'development',

    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.(s)css$/i,
          use: ["style-loader", {loader: "css-loader", options: {sourceMap: true}}, "sass-loader"],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
          generator: {filename: 'build/images/[name][ext]'}
        },
      ],
    },

    devServer: {
      host: 'localhost',
      watchFiles: ['assets/*'],
      static: {
        directory: path.join(__dirname, 'public'),
        watch: true,
      },
      compress: true,
      port: 8000,
      hot: true,
      open: true,
    },

    optimization: {minimize: false},
  }
}


/**
 * Production mode configuration
 * @type {{}}
 */
const prodConfig = () => {
  // Require des plugins utiles au mode production.
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
  const TerserPlugin = require("terser-webpack-plugin");

  return {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(s)css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'build/images/[name][ext]'
          }
        },
        {
          test: /\.(m)js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
            exclude: ['/assets/specs']
          }
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin(),],
    },

    plugins: [
      new MiniCssExtractPlugin({filename: "build/css/[name].css",}),
    ],
  };
};
