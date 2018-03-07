const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');


const utils = require('./utils');
const productionConfig = require('./webpack.production');
const productionDebugConfig = require('./webpack.production_debug');

const developmentConfig = require('./webpack.development');
const developmentMockConfig = require('./webpack.development_mock');

const PATHS = utils.paths();

const commonConfig = merge([
  {
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'ViewAR Template Vanilla',
        template: `${PATHS.app}/index.html`,
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
          test: /\.js$/,
          include: PATHS.app,
          exclude: [/node_modules/],

          use: {
            loader: 'babel-loader',
            options: {
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
              name: '[name].[hash:8].[ext]',
            },
          },
        },
        {
          test: /\.(png|jp?g|svg|gif|ico)$/,
          use: {
            loader: 'file-loader',
            options: {
              //limit: 2000, //url-loader uses file-loader implicitly when limit is set
              name: '[path][name].[hash:6].[ext]',
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

  console.log('using development mode');
  // defaults to development config
  return merge(commonConfig, developmentConfig.developmentConfig);
};
