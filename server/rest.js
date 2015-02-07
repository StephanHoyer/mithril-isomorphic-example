'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var resources = require('./resources');

app.use(bodyParser.json());

function save(instance, req, options) {
  return instance.save(req.body, options);
}

app.all('/:resource/:id?', function(req, res, next) {
  req.resource = resources[req.params.resource];
  next();
});

app.get('/:resource/:id', function(req, res, next) {
  if (!req.resource) {
    return next();
  }
  req.resource.forge({id: req.params.id}).fetch(req.query)
    .then(res.send.bind(res))
    .catch(function(err) {
      console.error(err);
      res.status(404).send({
        status: 404,
        error: req.params.resource + ' not found'
      });
    });
});

app.get('/:resource', function(req, res, next) {
  if (!req.resource) {
    return next();
  }
  req.resource.collection().fetch(req.query)
    .then(res.send.bind(res))
    .catch(next);
});

app.post('/:resource', function(req, res, next) {
  if (!req.resource) {
    return next();
  }
  var data = req.body;
  save(req.resource.forge(data), req, {method: 'insert'})
    .then(res.send.bind(res))
    .catch(next);
});

app.put('/:resource/:id', function(req, res, next) {
  if (!req.resource || !req.params.id) {
    return next();
  }
  var instance = req.resource.forge({id: req.params.id});
  save(instance, req).then(function() {
    res.send(instance);
  }).catch(next);
});

app.delete('/:resource/:id', function(req, res, next) {
  if (!req.resource || !req.params.id) {
    return next();
  }
  req.resource.forge({id: req.params.id}).destroy()
    .then(function() {
      res.status(200).end();
    })
    .catch(next);
});

app.use(function(err, req, res, next) {
  console.error(err);
  if (err.statusCode) {
    return res.status(err.statusCode).send(JSON.stringify(err.message || 'Error'));
  }
  next();
});

module.exports = app;
