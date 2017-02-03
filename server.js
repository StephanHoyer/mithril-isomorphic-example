'use strict'
require('mithril/test-utils/browserMock')(global)
global.window.XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest

var express = require('express')
var bodyParser = require('body-parser')
var web = require('./server/web')
var rest = require('./server/rest')
var compression = require('compression')
var browserify = require('browserify-middleware')

var app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(compression())
app.use(web)
app.use('/api/v1', rest)
app.get('/index.js', browserify('./client/index.js'))

var port = process.env.PORT || 8000
console.log('Server is now running on port ' + port)
app.listen(port)
