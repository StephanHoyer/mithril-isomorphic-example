'use strict'

module.exports = {
  dog: {
    get: function (id) {
      return Promise.resolve(id === '0' ? null : {
        id: id,
        name: 'Dolly'
      })
    }
  }
}
