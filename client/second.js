'use strict';

var m = require('mithril');

function controller() {
}

function view() {
  return [
    m.trust('<!-- Server side rendering \\o/ -->'),
    m('h1', 'Ohh, another page'),
    m('p', 'try to realod and look to the response'),
    m('a', {
      href: '/',
      config: m.route
    }, 'back to home page')
  ];
}

module.exports = {
  controller: controller,
  view: view
};
