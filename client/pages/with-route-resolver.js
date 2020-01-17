'use strict'

const m = require('mithril')
const Link = m.route.Link

const pauseFor = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
  onmatch: async function(params, route) {
    await pauseFor(1000)
    return {
      view: function() {
        return [
          m('div', 'route: ', route, JSON.stringify(params)),
          m(
            Link,
            {
              href: '/',
            },
            'back to home page'
          ),
        ]
      },
    }
  },
}
