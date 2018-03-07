const merge = require('webpack-merge');
const productionConfig = require('./webpack.config.prod');

exports.productionDebugConfig = merge(merge([{
  devtool: 'source-map',
}]), productionConfig.productionConfig);
