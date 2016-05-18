
var app = require('../server.js');
var request = require('supertest');

describe('Routes test', function()
{
  it('/index', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('/ajax', function(done) {
     request(app)
      .get('/ajax')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('/mail', function(done) {
     request(app)
      .get('/mail')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('/pin', function(done) {
    request(app)
      .get('/pin')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('/id (correct)', function(done) {
    request(app)
      .get('/id=5')
      .expect(200, '5')
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('/id (void)', function(done) {
    request(app)
      .get('/id')
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('/id (string)', function(done) {
    request(app)
      .get('/id=aaa')
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('/hello (correct)', function(done) {
    request(app)
      .get('/hello?name=aaa&last=bbb')
      .expect(200, 'Hello aaa bbb')
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('/hello (void)', function(done) {
    request(app)
      .get('/hello')
      .expect(200, 'Hello !not set! !not set!')
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('/notFound (404)', function(done) {
    request(app)
      .get('/notFound')
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
