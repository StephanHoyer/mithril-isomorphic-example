'use strict'

var m = require('mithril')

function view () {
  return [
    m('h1', 'mithril-isomorphic-example'),
    m('p', 'yes, it works'),
    m('a', {
      href: '/second-page/123',
      oncreate: m.route.link
    }, 'second page')
  ]
}

module.exports = {
  view: view
}
