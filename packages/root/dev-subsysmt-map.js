const sub1 = require('../sub-tempate/config')
module.exports = [
  sub1[process.env.ENV]
]
