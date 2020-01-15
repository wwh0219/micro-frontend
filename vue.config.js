
const path = require('path')
const url = require('url')
const _ = require('lodash')
const ENV = process.env.ENV || 'development'
const isProduction = ENV === 'production'
const isDev = ENV === 'development'
const envDir = path.join(process.cwd(), `./config.js`)
const envVars = require(envDir)[ENV]
const webpack = require('webpack')
const glob = require('glob')
const DefinePlugin = webpack.DefinePlugin
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const _config = require('./config')
let subsData = require('./packages/root/dev-subsysmt-map')
const formatEnv = function (obj) {
  const _temp = {}
  Object.keys(obj).forEach((key) => {
    _temp[key] = JSON.stringify(obj[key])
  })
  return _temp
}
module.exports = (externalConfig = {}) => {
  const { chainWebpack, ..._externalConfig } = externalConfig
  return _.merge({
    chainWebpack: config => {
      config.plugin('define')
        .use(DefinePlugin, [{
          'process.env': {
            ...formatEnv(envVars),
            NODE_ENV: JSON.stringify(ENV),
            IS_DEV: isDev,
            IS_PRODUCTION: isProduction,
            DEV_SUB_SYS_CONFIG_MAP: JSON.stringify(subsData)
          }
        }])
        .end()
      if (isDev) {
        config.plugin('dll')
          .use(webpack.DllReferencePlugin, [
            {
              context: __dirname,
              manifest: require(_config.dll.dllJSONPath)
            }
          ])
        console.log(glob.sync(path.resolve(_config.dll.dllOutPutDir, 'vendor.**.css'))[0])
        config.plugin('add-asset-html-webpack-plugin-js')
          .use(AddAssetHtmlPlugin, [
            {
              filepath: path.resolve(_config.dll.dllOutPutDir, 'vendor.**.dll.js'),
              publicPath: _config[ENV].dllPublicPath
            }
          ])
        config.plugin('add-asset-html-webpack-plugin-css')
          .use(AddAssetHtmlPlugin, [
            {
              filepath: path.resolve(_config.dll.dllOutPutDir, 'vendor.**.css'),
              publicPath: _config[ENV].dllPublicPath,
              typeOfAsset: 'css'
            }
          ])
      }
      chainWebpack && chainWebpack(config)
    },
    configureWebpack: {
      resolve: {
        symlinks: false,
        alias: {
          shared: path.join(__dirname, './packages/shared')
        }
      }
    },
    devServer: {
      historyApiFallback: true,
      port: envVars.PORT,
      before: function (app, server) {
        app.all('*', (req, res, next) => {
          res.set('Access-Control-Allow-Origin', '*')
          res.set('Access-Control-Allow-Headers', '*')
          res.set('Access-Control-Allow-Methods', 'GET, POST, PUT')
          next()
        })
        app.get('/manifest.json', function (req, res) { // 开发环境生成manifest.json
          res.json({
            scripts: [
              new url.URL('/app.js', envVars.PUBLIC_PATH)
            ]
          })
        })
      }
    },
    css: {
      loaderOptions: {
        // pass options to sass-loader
        sass: {
          // @/ is an alias to src/
          // so this assumes you have a file named `src/variables.scss`
          data: '@import "~@/styles/import.scss";',
          sourceMap: !isProduction
        },
        css: {
          sourceMap: !isProduction
        }
      }
    }
  }, _externalConfig)
}
