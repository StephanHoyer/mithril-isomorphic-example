/**
 * Created by lotus_warrior on 7/19/15.
 */
'use strict';

var request = require('request');

module.exports = request.defaults({
  baseUrl: 'http://realtime.mbta.com/developer/api/v2/',
  qs: {
    api_key: 'f5g66rP6K0ubg1cfQpdGow',
    format: 'json'
  }
});