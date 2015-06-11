
var assert = require('assert');
var request = require('request');

var _baseUrl = 'http://localhost:3000';

describe('Site test', function()
{
  it('route: /id', function(done) {
    request.get(_baseUrl+'/id=5', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 5);
      done();
    });
  });

  it('route: /hello', function(done) {
    request.get(_baseUrl+'/hello?name=aaa&last=bbb', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 'Hello aaa bbb');
      done();
    });
  });

});
