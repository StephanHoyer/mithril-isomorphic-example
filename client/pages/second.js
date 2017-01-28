'use strict'

var m = require('mithril')
var store = require('../../store')

var dogInfo = {
  type: 'cat',
  oninit: function (vnode) {
    vnode.state.myDog = vnode.attrs.myDog
  },
  view: function (vnode) {
    var myDog = vnode.state.myDog
    return m('p', myDog && ('My ' + vnode.state.type + 's name is ' + myDog.name + '(' + myDog.id + ')'))
  }
}

function oninit (vnode) {
  return store.load('dog', vnode.attrs.id).then(function (dog) {
    vnode.state.myDog = dog
  })
}

function view (vnode) {
  return [
    m.trust('<!-- Server side rendering \\o/ -->'),
    m('h1', 'Ohh, another page'),
    m('p', 'try to realod and look to the response'),
    m('a', {
      href: '/',
      oncreate: m.route.link
    }, 'back to home page'),
    vnode.state.myDog && m(dogInfo, {
      myDog: vnode.state.myDog
    })
  ]
}

module.exports = {
  oninit: oninit,
  view: view
}
