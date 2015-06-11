
var assert = require('assert');
var request = require('request');

var _baseUrl = 'http://localhost:3000';

describe('Route test', function()
{
  it('/id', function(done) {
    request.get(_baseUrl+'/id=5', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 5);
      done();
    });
  });

  it('/hello', function(done) {
    request.get(_baseUrl+'/hello?name=aaa&last=bbb', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 'Hello aaa bbb');
      done();
    });
  });

});
