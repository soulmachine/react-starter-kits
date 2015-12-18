'use strict';

var webpack = require('webpack');
var path = require('path');
var baseConfig = require('./webpack.config.base');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var config = Object.create(baseConfig);
config.devServer = {
  historyApiFallback: true,
  hot: true,
  inline: true,
  progress: true,
  contentBase: './build',
  port: 8080
};
config.entry = [
  'babel-polyfill',
  'webpack/hot/dev-server',
  'webpack-dev-server/client?http://localhost:8080',
  path.resolve(__dirname, 'src/main.jsx')
];
config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
];

module.exports = config;
