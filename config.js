const path = require('path')
exports.development = {
  dllPort: 12306,
  get dllPublicPath () {
    return `http://localhost:${this.dllPort}/vendor/`
  }
}

exports.dll = {
  dllAssetDir: `libs/dll/${process.env.ENV}/`,
  get dllOutPutDir () {
    return path.resolve(__dirname, `./packages/shared/public/${this.dllAssetDir}`)
  },
  dllJSONPath: path.resolve(__dirname, `./packages/shared/public/libs/dll/${process.env.ENV}/vendor-manifest.json`)
}
