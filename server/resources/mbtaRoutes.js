/**
 * Created by lotus_warrior on 7/19/15.
 */
'use strict';

var Promise = require('promise');
var request = require('./baseRequest');
var fs = require('fs');

module.exports = {
  query: function () {
    var data = '';

    var path;
    var pathSuffix = 'resources/mbtaRoutes.json';

    if (process.env.TEST_MODE === 'true') {
      path = './spec/' + pathSuffix;
    } else {
      path = './server/' + pathSuffix;
    }

    return new Promise(function(resolve, reject) {
      fs.exists(path, function(fileExists) {
        if (fileExists) {
          fs.readFile(path, 'utf-8', function(err, data){
            err ? reject(err) : resolve(data);
          });
        } else {
          request.get('routes').on('data', function (chunk) {
            data += chunk;
          }).on('end', function (response) {
            resolve(data);
          });
        }
      })
    });
  }
};