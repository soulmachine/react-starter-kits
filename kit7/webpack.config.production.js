'use strict';

var webpack = require('webpack');
var path = require('path');
var baseConfig = require('./webpack.config.base');

var config = Object.create(baseConfig);
config.entry = [
  'babel-polyfill',
  path.resolve(__dirname, 'src/main.jsx')
];
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  })
];

module.exports = config;
