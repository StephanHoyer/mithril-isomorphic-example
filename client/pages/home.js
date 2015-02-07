'use strict';

var m = require('mithril');

function controller() {
}

function view() {
  return [
    m('h1', 'mithril-isomorphic-example'),
    m('p', 'yes, it works'),
    m('a', {
      href: '/second-page',
      config: m.route
    }, 'second page')
  ];
}

module.exports = {
  controller: controller,
  view: view
};
