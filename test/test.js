
var assert = require('assert');
var request = require('request');

var _baseUrl = 'http://localhost:3000';

describe('Routes test', function()
{
  it('/index', function(done) {
    request.get(_baseUrl+'/', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      done();
    });
  });

  it('/ajax', function(done) {
    request.get(_baseUrl+'/ajax', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      done();
    });
  });

  it('/mail', function(done) {
    request.get(_baseUrl+'/mail', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      done();
    });
  });

  it('/pin', function(done) {
    request.get(_baseUrl+'/pin', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      done();
    });
  });

  it('/id (correct)', function(done) {
    request.get(_baseUrl+'/id=5', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 5);
      done();
    });
  });

  it('/id (void)', function(done) {
    request.get(_baseUrl+'/id', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 404);
      done();
    });
  });

  it('/id (string)', function(done) {
    request.get(_baseUrl+'/id=aaa', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 404);
      done();
    });
  });

  it('/hello (correct)', function(done) {
    request.get(_baseUrl+'/hello?name=aaa&last=bbb', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 'Hello aaa bbb');
      done();
    });
  });

  it('/hello (void)', function(done) {
    request.get(_baseUrl+'/hello', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 'Hello !not set! !not set!');
      done();
    });
  });

  it('/notFound or 404', function(done) {
    request.get(_baseUrl+'/notFound', function(err, res, body) {
      assert.equal(err, null);
      assert.equal(res.statusCode , 404);
      done();
    });
  });

});
