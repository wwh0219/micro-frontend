const express = require('express')
const app = express()
app.use('/vendor', express.static('./packages/common/public/libs/dll/development'))
app.listen(12306)
