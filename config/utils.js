const webpack = require('webpack');
const path = require('path');

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};

exports.paths = () => ({
  app: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build'),
});