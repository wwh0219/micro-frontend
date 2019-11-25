const path = require('path')
exports.development = {
  dllPort: 12306,
  get dllPublicPath () {
    return `http://localhost:${this.dllPort}/vendor/`
  }
}

exports.common = {
  dllAssetDir: `libs/dll/${process.env.ENV}/`,
  get dllOutPutDir () {
    return path.resolve(__dirname, `./packages/common/public/${this.dllAssetDir}`)
  }
}
