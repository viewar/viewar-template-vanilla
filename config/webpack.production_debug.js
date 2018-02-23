const merge = require('webpack-merge');
const productionConfig = require('./webpack.production');

exports.productionDebugConfig = merge(merge([{
  devtool: 'source-map',
}]), productionConfig.productionConfig);