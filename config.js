const path = require('path')
exports.dll = {
  port: 12306,
  assetDir: `libs/dll/${process.env.ENV}/`,
  get outPutDir () {
    return path.resolve(__dirname, `./packages/shared/public/${this.assetDir}`)
  },
  dllJSONPath: path.resolve(__dirname, `./packages/shared/public/libs/dll/${process.env.ENV}/vendor-manifest.json`),
  get publicPath () {
    const port = this.port
    return {
      development: `http://localhost:${port}/vendor/`,
      production: `http://localhost:${port}/vendor/`
    }[process.env.ENV]
  }
}
