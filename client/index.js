'use strict'

const domready = require('domready')
const m = require('mithril')

const routes = require('./routes')

m.route.prefix = ''

domready(function() {
  m.route(document.body, '/', routes)
})
