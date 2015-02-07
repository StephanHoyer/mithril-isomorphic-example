'use strict';

var extend = require('lodash').extend;
var m = require('mithril');

function apiUrl(type) {
  return '/api/v1/' + type;
}

function save(instance) {
  var data = instance;
  if (!instance.type) {
    throw new Error('no type provided to save model');
  }
  return m.request({
    method: instance.id ? 'PUT' : 'POST',
    url: apiUrl(instance.type) + (instance.id ? '/' + instance.id : ''),
    data: data
  }).then(function(result) {
    return extend(instance, result);
  });
}

function load(type, id) {
  if (!type) {
    throw new Error('no type provided to load model');
  }

  if (!id) {
    throw new Error('no id provided to load model');
  }

  return m.request({
    method: 'GET',
    url: apiUrl(type + '/' + id),
  });
}

function remove(instance) {
  if (!instance) {
    throw new Error('no instance given to remove');
  }
  if (!instance.type) {
    throw new Error('no type provided to remove instance');
  }
  if (!instance.id) {
    throw new Error('no id provided to remove instance');
  }
  return m.request({
    method: 'DELETE',
    url: apiUrl(instance.type + '/' + instance.id)
  });
}

function loadWhere(type, query) {
  if (!type) {
    throw new Error('no type provided to load model');
  }
  
  return m.request({
    method: 'GET',
    url: apiUrl(type),
    data: query
  });
}

module.exports = {
  save: save,
  load: load,
  loadWhere: loadWhere,
  remove: remove
};
