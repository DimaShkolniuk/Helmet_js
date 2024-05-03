const express = require('express')
const helmet = require('helmet')
const app = express()

module.exports = app
const api = require('./server.js')
app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({ action: 'deny' })) //protect against Clickjacking.
app.use(helmet.xssFilter()) //protect against XSS.
app.use(helmet.noSniff()) //protect against MIME sniffing.
app.use(helmet.ieNoOpen()) //protect against HTTP opening on the Internet Explorer
app.use(express.static('public'))
app.disable('strict-transport-security')
app.use('/_api', api)
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html')
})
let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`)
})
