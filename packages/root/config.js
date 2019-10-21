const base = {
  ID: 0,
  IS_ROOT: true,
  PORT: 7770
}
exports.development = {
  ...base,
  BASE_API: '/',
  PUBLIC_PATH: `http://localhost:${base.PORT}`
}
