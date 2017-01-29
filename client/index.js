'use strict'

var domready = require('domready')
var m = require('mithril')

var routes = require('./routes')

m.route.prefix('')

domready(function () {
  m.route(document.body, '/', routes)
})
