
import * as path from 'path';
import * as webpack from 'webpack';
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommon = require('./webpack.common');

const devConfig: webpack.Configuration = merge(webpackCommon,{
  devtool:'source-map',
  plugins:[
    new HtmlWebpackPlugin({
      inject:true,
      filename:'index.html',
      template: path.resolve(__dirname, '../example/index.html'),
      title:'example'
    })
  ]
})

module.exports = devConfig