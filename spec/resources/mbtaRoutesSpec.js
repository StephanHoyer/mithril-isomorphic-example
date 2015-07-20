/**
 * Created by lotus_warrior on 7/18/15.
 */
describe('MBTA Routes --', function () {
  var nock = require('nock');
  var fakeServer = require('../fakeServer');
  var http = require('http');
  var mbtaRoutes = require('../../server/resources/mbtaRoutes');

  it('testing that the get fires the right request', function () {
    var params = {
      api_key: 'f5g66rP6K0ubg1cfQpdGow',
      format: 'json'
    };
    var request = nock('http://realtime.mbta.com/developer/api/v2/')
        .log(console.log)
        .get('/routes')
        .query(params).delay(1).reply(200, {
          data: 'test'
        });

    console.log(new Date() + ' : here');

    mbtaRoutes.query().then(
        function (routes) {
          request.done();
          asyncSpecDone();
        }
    );
    asyncSpecWait();
  });
});