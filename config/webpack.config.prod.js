const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpack = require('webpack');
const path = require('path');

const utils = require('./utils');
const PATHS = utils.paths();

const extractTextPlugin = new ExtractTextPlugin({
  filename: '[name].css',
});


const extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});

exports.productionConfig = merge([
  {
    entry: {
      index: [
        PATHS.app + '/polyfills.js',
        PATHS.app,
      ],
    },
    output: {
      chunkFilename: '[name].js',
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: extractTextPlugin.extract({
            use: [
              { loader: 'css-loader', options: { importLoaders: 1, modules: false, localIdentName: '[name]-[local]' } },
              { loader: 'postcss-loader', options: { plugins: [
                require('postcss-smart-import')(),
                require('postcss-cssnext')(),
                require('postcss-responsive-type')(),
              ] }},
            ],
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([PATHS.build + '/*'], { root: path.resolve(__dirname, '..') }),
      extractTextPlugin,
      new UglifyJsPlugin(),
    ],
  },
  extractBundles([
    {
      name: 'vendor',
      chunks: ['index'], //define entries multiple for shared chunks
      minChunks: isVendor,
    },
  ]),
  utils.setFreeVariable('process.env.NODE_ENV', 'production'),
]);

function isVendor({ resource }) {
  return resource &&
    resource.indexOf('node_modules') >= 0 &&
    resource.match(/\.js$/);
}
