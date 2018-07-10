'use strict'

const m = require('mithril')

const pauseFor = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
  onmatch: async function(params, route) {
    await pauseFor(1000)
    return {
      view: function() {
        return [
          m('div', 'route: ', route, JSON.stringify(params)),
          m(
            'a',
            {
              href: '/',
              oncreate: m.route.link,
            },
            'back to home page'
          ),
        ]
      },
    }
  },
}
