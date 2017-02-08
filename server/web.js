'use strict'

var express = require('express')
var routes = require('../client/routes')
var toHtml = require('mithril-node-render')
var m = require('mithril')

var app = express()

Object.keys(routes).map(function (route) {
  const module = routes[route]
  const onmatch = module.onmatch || (() => module)
  const render = module.render || (a => a)
  app.get(route, function (req, res, next) {
    res.type('html')
    Promise.resolve()
      .then(() => m(onmatch(req.params, req.url) || 'div', req.params))
      .then(render)
      .then(toHtml)
      .then(res.send.bind(res))
      .catch(next)
  })
})

module.exports = app
