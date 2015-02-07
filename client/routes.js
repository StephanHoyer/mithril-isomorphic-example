'use strict';

var home = require('./home');
var second = require('./second');

module.exports = {
  '/': home,
  '/second-page': second
};
