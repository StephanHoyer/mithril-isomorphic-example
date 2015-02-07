'use strict';

var resources = require('../server/resources');

function load(type, id) {
  if (!resources[type]) {
    throw Error('Resource with type "' + type + '" does not exist');
  }
  return resources[type].get(id);
}

function loadWhere(type, query) {
  if (!resources[type]) {
    throw Error('Resource with type "' + type + '" does not exist');
  }
  return resources[type].query(query);
}

function remove(model) {
  if (!model.type) {
    throw new Error('model has no type, remove not possible');
  }
  return resources[model.type].destroy(model.id);
}

function save(model) {
  if (!model.type) {
    throw new Error('model has no type, save not possible');
  }
  return resources[model.type].save(model);
}

module.exports = {
  save: save,
  load: load,
  remove: remove,
  loadWhere: loadWhere
};
