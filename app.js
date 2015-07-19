'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var web = require('./server/web');
var rest = require('./server/rest');
var compression = require('compression');
var browserify = require('browserify-middleware');
var request = require('request');


var app = express();

request.defaults.baseUrl = 'http://realtime.mbta.com/developer/api/v2/';
request.defaults.qs = {
  api_key: 'f5g66rP6K0ubg1cfQpdGow',
  format: 'json'
};

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(compression());
app.use(require('morgan')('dev'));
app.use(web);
app.use('/api/v1', rest);
app.get('/index.js', browserify('./client/index.js'));

var port = process.env.PORT || 8000;
process.env['TEST_MODE'] = false;
console.log('Server is now running on port ' + port);
console.log(process.env['TEST_MODE']);
app.listen(port);