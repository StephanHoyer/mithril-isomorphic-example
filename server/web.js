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
  app.get(route, async function (req, res, next) {
    res.type('html')
    try {
      const rootNode = render(m(await onmatch(req.params, req.url) || 'div', req.params))
      res.send(await toHtml(rootNode))
    } catch (err) {
      next(err)
    }
  })
})

module.exports = app
