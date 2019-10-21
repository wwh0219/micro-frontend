
const path = require('path')
const url = require('url')
const ENV = process.env.ENV || 'development'
const isProduction = ENV === 'production'
const isDev = ENV === 'development'
const envDir = path.join(process.cwd(), `./config.js`)
const envVars = require(envDir)[ENV]
const DefinePlugin = require('webpack').DefinePlugin
const formatEnv = function (obj) {
  const _temp = {}
  Object.keys(obj).forEach((key) => {
    _temp[key] = JSON.stringify(obj[key])
  })
  return _temp
}
module.exports = {
  chainWebpack: config => {
    config.plugin('define')
      .use(DefinePlugin, [{
        'process.env': {
          ...formatEnv(envVars),
          NODE_ENV: JSON.stringify(ENV),
          IS_DEV: isDev,
          IS_PRODUCTION: isProduction
        }
      }])
      .end()
  },
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        common: path.join(__dirname, './packages/common/src')
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
          ],
          env: envVars
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
}
