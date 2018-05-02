const base = require('./webpack.base.config');
const merge = require('webpack-merge');
const config = require('../config')
const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__

let webpackConfig;
if (__DEV__) {
  webpackConfig = require('./webpack.dev.config');
} else {
  webpackConfig = require('./webpack.prod.config');
}

module.exports = merge(base, webpackConfig);