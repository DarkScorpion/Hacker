'use strict';

var log = require('../lib/intel.js');

exports.main = function(req, res)
{
  res.render('hacker');
};

exports.ajax = function(req, res)
{
  res.render('ajax');
};

exports.mail = function(req, res)
{
  res.render('mail');
}

exports.pin = function(req, res)
{
  res.render('pin');
};

exports.id = function(req, res) 
{
  var id = req.params.id;

  res.send(id);
  log.info('id='+id);
};

exports.hello = function(req, res)
{
  var notSet = '!not set!';

  var name = req.query.name || notSet;
  var lastName = req.query.last || notSet;

  res.send('Hello '+name+' '+lastName);
  log.info('Hello page: '+JSON.stringify(req.query));
};

exports.err404 = function(req, res)
{
  res.status(404).render('error404');
  log.info('Wrong params: '+req.params[0]);
};
