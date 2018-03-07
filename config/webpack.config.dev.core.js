const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const developmentConfig = require('./webpack.config.dev');
const utils = require('./utils');

exports.developmentCoreConfig = merge(merge([
  {
    plugins: [
      new CopyWebpackPlugin([
        { from: 'node_modules/viewar-core/viewar-core.js', to: 'viewar-core.js'},
      ], {
        copyUnmodified: true,
      }),
    ]
  },
  utils.setFreeVariable('process.env.NODE_ENV', 'core'),
]), developmentConfig.developmentConfig);
