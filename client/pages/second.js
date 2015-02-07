'use strict';

var m = require('mithril');
var store = require('../../store');

function controller(params, done) {
  var scope = {};
  store.load('dog', 123).then(function(dog) {
    scope.myDog = dog;
    done && done(null, scope);
  });
  return scope;
}

function view(scope) {
  return [
    m.trust('<!-- Server side rendering \\o/ -->'),
    m('h1', 'Ohh, another page'),
    m('p', 'try to realod and look to the response'),
    m('a', {
      href: '/',
      config: m.route
    }, 'back to home page'),
    m('p', scope.myDog && ('My dogs name is ' + scope.myDog.name) || '')
  ];
}

module.exports = {
  controller: controller,
  view: view
};
