'use strict';

var home = require('./pages/home');
var second = require('./pages/second');

module.exports = {
  '/': home,
  '/second-page': second
};
