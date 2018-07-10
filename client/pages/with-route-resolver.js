'use strict'

const m = require('mithril')

module.exports = {
  onmatch: async function(params, route) {
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
