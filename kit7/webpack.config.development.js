'use strict';

var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var config = Object.create(baseConfig);
config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
];

module.exports = config;
