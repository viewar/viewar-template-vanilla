const merge = require('webpack-merge');
const webpack = require('webpack');

const developmentConfig = require('./webpack.config.dev');
const utils = require('./utils');


exports.developmentMockConfig = merge(merge([
  utils.setFreeVariable('process.env.NODE_ENV', 'mock'),
]), developmentConfig.developmentConfig);
