
var assert = require('assert');
var request = require('request');

function testUrl(route, callback)
{
  var baseUrl = 'http://localhost:3000';
  request.get(baseUrl+route, callback);
}

describe('Routes test', function()
{
  it('/index', function(done) {
   testUrl('/', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      done();
    });
  });

  it('/ajax', function(done) {
    testUrl('/ajax', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      done();
    });
  });

  it('/mail', function(done) {
    testUrl('/mail', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      done();
    });
  });

  it('/pin', function(done) {
    testUrl('/pin', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      done();
    });
  });

  it('/id (correct)', function(done) {
    testUrl('/id=5', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 5);
      done();
    });
  });

  it('/id (void)', function(done) {
    testUrl('/id', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 404);
      done();
    });
  });

  it('/id (string)', function(done) {
    testUrl('/id=aaa', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 404);
      done();
    });
  });

  it('/hello (correct)', function(done) {
    testUrl('/hello?name=aaa&last=bbb', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 'Hello aaa bbb');
      done();
    });
  });

  it('/hello (void)', function(done) {
    testUrl('/hello', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 'Hello !not set! !not set!');
      done();
    });
  });

  it('/notFound or 404', function(done) {
    testUrl('/notFound', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 404);
      done();
    });
  });

});
