const base = {
  ID: 1,
  ALIAS: 'sub1',
  PORT: 7771
}
exports.development = {
  ...base,
  PUBLIC_PATH: `http://localhost:${base.PORT}`
}
exports.production = {
  ...base,
  PUBLIC_PATH: `http://localhost:${base.PORT}`
}
