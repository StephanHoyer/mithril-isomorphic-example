'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var store = require('../store');

app.use(bodyParser.json());

app.all('/:resource/:id?', function(req, res, next) {
  req.resource = req.params.resource;
  next();
});

app.get('/:resource/:id', function(req, res, next) {
  if (!req.resource) {
    return next();
  }
  store.load(req.resource, req.params.id)
    .then(res.send.bind(res))
    .catch(next);
});

app.get('/:resource', function(req, res, next) {
  if (!req.resource) {
    return next();
  }
  store.loadWhere(req.resource, req.query)
    .then(res.send.bind(res))
    .catch(next);
});

app.post('/:resource', function(req, res, next) {
  if (!req.resource) {
    return next();
  }
  var model = req.body;
  model.type = req.resource;
  store.save(model)
    .then(res.send.bind(res))
    .catch(next);
});

app.put('/:resource/:id', function(req, res, next) {
  if (!req.resource || !req.params.id) {
    return next();
  }
  var model = req.body;
  model.type = req.resource;
  model.id = req.params.id;
  store.save(model)
    .then(res.send.bind(res))
    .catch(next);
});

app.delete('/:resource/:id', function(req, res, next) {
  if (!req.resource || !req.params.id) {
    return next();
  }
  store.destroy({ id: req.params.id })
    .then(function() {
      res.status(200).end();
    })
    .catch(next);
});

module.exports = app;
