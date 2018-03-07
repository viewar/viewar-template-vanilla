const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const fs = require('fs')

const {appId, appVersion} = JSON.parse(fs.readFileSync(`${__dirname}/../.viewar-config`))

const utils = require('./utils');
const productionConfig = require('./webpack.config.prod');
const productionDebugConfig = require('./webpack.config.prod.debug');

const developmentCoreConfig = require('./webpack.config.dev.core');
const developmentMockConfig = require('./webpack.config.dev.mock');

const PATHS = utils.paths();

const commonConfig = merge([
  {
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'ViewAR Vanilla Boilerplate',
        template: `${PATHS.app}/index.html`,
        inject: true,
        bundleIdentifier: appId,
        bundleVersion: appVersion,
      }),
    ],
    resolve: {
      modules: [
        "node_modules",
      ],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: PATHS.app,
          exclude: [/node_modules/],

          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['transform-object-rest-spread', 'transform-export-extensions'],
              // Enable caching for improved performance during development.
              cacheDirectory: true,
            },
          },
        },
        {
          // Capture eot, ttf, woff, and woff2
          test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        },
        {
          test: /\.(png|jp?g|svg|gif|ico)$/,
          use: {
            loader: 'file-loader',
            options: {
              //limit: 2000, //url-loader uses file-loader implicitly when limit is set
              name: '[path][name].[ext]',
            },
          },
        },
      ],
    },
  },
]);

module.exports = (env) => {
  process.env.BABEL_ENV = env;

  if (env === 'production') {
    console.log('using production mode');
    return merge(commonConfig, productionConfig.productionConfig);
  }
  if (env === 'production_debug') {
    console.log('using production debug mode');
    return merge(commonConfig, productionDebugConfig.productionDebugConfig);
  }

  if (env === 'development_mock') {
    console.log('using development mock mode');
    return merge(commonConfig, developmentMockConfig.developmentMockConfig);
  }

  console.log('using development core mode');
  // defaults to development config
  return merge(commonConfig, developmentCoreConfig.developmentCoreConfig);
};
