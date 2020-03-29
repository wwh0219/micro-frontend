const base = {
  ID: 0,
  PORT: 7770
}
exports.development = {
  ...base,
  BASE_API: '/',
  PUBLIC_PATH: `http://localhost:${base.PORT}`
}
exports.production = {
  ...base,
  BASE_API: '/',
  PUBLIC_PATH: `http://localhost:${base.PORT}`
}
