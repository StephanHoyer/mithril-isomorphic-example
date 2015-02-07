'use strict';

var express = require('express');
var routes = require('../client/routes');
var each = require('lodash').each;
var render = require('mithril-node-render');

var app = express();

function base(content) {
  return [
    '<!doctype html>',
    '<html>',
    '<head>',
    '<title>isomorphic mithril application</title>',
    '<meta charset="utf-8">',
    '<script src="/index.js"></script>',
    '</head>',
    '<body>',
    content,
    '</body>',
    '</html>'
  ].join('');
}

each(routes, function(module, route) {
  app.get(route, function(req, res, next) {
    res.type('html');
    function send(scope) {
      res.end(base(render(module.view(scope))));
      scope && scope.unonload && scope.onunload();
    }
    if (module.controller.length < 2) { //sync, response imedeatly
      return send(module.controller(req.params));
    }
    // async, call with callback
    return module.controller(req.params, function(err, scope) {
      if (err) {
        return next(err);
      }
      send(scope);
    });
  });
});

module.exports = app;
