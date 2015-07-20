/**
 * Created by lotus_warrior on 7/19/15.
 */
    //TODO: Use common code for mock test server and real server
var app = require('express')();

var rest = require('../server/rest');

app.use('/api/v1', rest);

process.env['TEST_MODE'] = true;

module.exports = app;