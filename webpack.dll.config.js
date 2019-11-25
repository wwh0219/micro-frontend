const webpack = require('webpack')
const path = require('path')
const vendor = Object.keys(require('./package').dependencies)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const fs = require('fs-extra')
const ENV = process.env.ENV
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const config = require('./config.js')
fs.emptyDirSync(config.common.dllOutPutDir)// 清空输出目录

module.exports = {
  entry: {
    vendor
    // monaco: ['monaco-editor'],
  },

  output: {
    filename: '[name].[hash].dll.js',
    path: config.common.dllOutPutDir,
    library: '[name]',
    publicPath: config[ENV].dllPublicPath
  },

  plugins: [
    new ProgressBarPlugin(),
    new webpack.DllPlugin({
      path: path.join(config.common.dllOutPutDir, `[name]-manifest.json`),
      // This must match the output.library option above
      name: '[name]',
      context: __dirname
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV)
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ],
  module: {
    rules: [
      {
        test: /.*(\.css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000000000000000
          }
        }]
      }
    ]
  },
  stats: 'verbose'
}
