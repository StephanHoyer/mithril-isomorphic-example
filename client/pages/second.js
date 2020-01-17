'use strict'

const m = require('mithril')
const apiUrl = 'http://localhost:8000/api/v1/'
const baseView = require('../baseView')
const Link = m.route.Link

const dogInfo = {
  type: 'dog',
  oninit: function(vnode) {
    vnode.state.myDog = vnode.attrs.myDog
  },
  view: function(vnode) {
    var myDog = vnode.state.myDog
    return m(
      'p',
      myDog && `My ${vnode.state.type}'s name is ${myDog.name}(${myDog.id})`
    )
  },
}

function noop() {}

function oninit(vnode, waitFor = noop) {
  waitFor(
    m.request(`${apiUrl}dog/${vnode.attrs.id}`).then(dog => {
      vnode.state.myDog = dog
      vnode.state.getTitle = () => dog.name
    })
  )
}

function view(vnode) {
  return [
    m('h1', 'Ohh, another page'),
    m('h2', process.browser ? 'browser rendered' : 'Server rendered'),
    m('p', 'try to reload and look to the response'),
    m(
      Link,
      {
        href: '/',
      },
      'back to home page'
    ),
    vnode.state.myDog
      ? m(dogInfo, {
          myDog: vnode.state.myDog,
        })
      : m('p', 'loading'),
  ]
}

module.exports = {
  oninit: oninit,
  view: baseView(view),
}
