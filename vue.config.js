
const path = require('path')
const url = require('url')
const _ = require('lodash')
const ENV = process.env.ENV || 'development'
const isProduction = ENV === 'production'
const isDev = ENV === 'development'
const envDir = path.join(process.cwd(), `./config.js`)
const envVars = require(envDir)[ENV]
const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin
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
      chainWebpack && chainWebpack(config)
    },
    configureWebpack: {
      resolve: {
        symlinks: false,
        alias: {
          shared: path.join(__dirname, './packages/shared')
        }
      },
      output: {
        jsonpFunction: `webpack_jsonp_${envDir.ID}`
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
