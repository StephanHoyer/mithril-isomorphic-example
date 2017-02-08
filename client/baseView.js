'use strict'

var m = require('mithril')

var fallbackTitle = 'isomorphic mithril application'

module.exports = function (view) {
  if (process.browser) {
    return function (vnode) {
      if (vnode.state.getTitle) {
        document.title = vnode.state.getTitle()
      }
      return view(vnode)
    }
  }
  return function (vnode) {
    return [
      m('!doctype[html]'),
      m('html[lang=en]', [
        m('head', [
          m('title', vnode.state.getTitle() || fallbackTitle),
          m('meta[charset=utf-8]'),
          m('script[src=/index.js]')
        ])
      ]),
      m('body', view(vnode))
    ]
  }
}
