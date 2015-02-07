'use strict';

var m = require('mithril');

function controller() {
}

function view() {
  return [
    m('h1', 'mithril-isomorphic-example'),
    m('p', 'yes, it works')
  ];
}

module.exports = {
  controller: controller,
  view: view
};
