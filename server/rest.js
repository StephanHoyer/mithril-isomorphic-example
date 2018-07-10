'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/dog/:id', function(req, res, next) {
  res.send({
    id: req.params.id,
    name: 'Dolly',
  })
})

module.exports = app
