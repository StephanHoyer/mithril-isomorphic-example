'use strict';

if (global.document) {
  require('es6-promise').polyfill();
}
var domready = require('domready');
var m = require('mithril');

var routes = require('./routes');

m.route.mode = 'pathname';

domready(function() {
  m.route(document.body , '/', routes);
});
