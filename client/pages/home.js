'use strict'

const m = require('mithril')
const baseView = require('../baseView')
const Link = m.route.Link

function view() {
  return [
    m('h1', 'mithril-isomorphic-example'),
    m('p', 'yes, it works'),
    m(
      Link,
      {
        href: '/second-page/123',
      },
      'second page'
    ),
    m(
      Link,
      {
        href: '/with-route-resolver/999',
      },
      'with route resolver'
    ),
  ]
}

module.exports = {
  view: baseView(view),
}
