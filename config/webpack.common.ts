// import * as path from 'path'
import * as webpack from 'webpack'

const path = require('path')
// const webpack = require('webpack')

import 'webpack-dev-server'

const configCommon: webpack.Configuration = {
	entry: {
		app: path.join(__dirname, '../src/index.ts')
	},
	output: {
		path: path.join(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.ts(x?)$/,
				use: [
					{
						loader: 'babel-loader'
					},
					{
						loader: 'ts-loader'
					}
				],
				exclude: /node_modules/
			}]

	},
	resolve:{
		extensions: ['.js', '.ts', '.tsx', '.json','.wasm'],
		alias: {
			'@zxy/components': path.resolve(__dirname, 'packages/components/src/index.ts'),
			'@zxy/plugins': path.resolve(__dirname, 'packages/plugins/src/index.ts'),
			'@zxy/utils': path.resolve(__dirname, 'packages/utils/src/index.ts'),
		},

	},
	devServer:{
		static:{
			directory: path.join(__dirname, '../example') // 修改默认静态服务访问public目录
		}
	}
}

module.exports = configCommon
