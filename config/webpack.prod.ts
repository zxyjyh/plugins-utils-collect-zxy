
const { merge } = require('webpack-merge');
import * as webpack from 'webpack';
const commonConfig = require('./webpack.common')

const prodConfig: webpack.Configuration = merge(commonConfig,{
  mode: 'production'
})

module.exports = prodConfig