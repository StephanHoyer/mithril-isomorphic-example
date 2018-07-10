'use strict'

const express = require('express')
const routes = require('../client/routes')
const toHtml = require('mithril-node-render')
const m = require('mithril')

const app = express()

Object.keys(routes).map(function(route) {
  const module = routes[route]
  const onmatch = module.onmatch || (() => module)
  const render = module.render || (a => a)
  app.get(route, async function(req, res, next) {
    res.type('html')
    try {
      const rootNode = render(
        m((await onmatch(req.params, req.url)) || 'div', req.params)
      )
      res.send(await toHtml(rootNode))
    } catch (err) {
      next(err)
    }
  })
})

module.exports = app
