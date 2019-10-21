const base = {
  ID: 1,
  ALIAS: 'sub',
  PORT: 7771
}
exports.development = {
  ...base,
  PUBLIC_PATH: `http://localhost:${base.PORT}`
}
