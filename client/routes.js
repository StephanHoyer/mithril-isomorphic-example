'use strict'

module.exports = {
  '/': require('./pages/home'),
  '/second-page/:id': require('./pages/second'),
  '/with-route-resolver/:id': require('./pages/with-route-resolver'),
}
