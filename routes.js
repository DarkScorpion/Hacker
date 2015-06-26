'use strict';

var sp = require('./lib/util.js');
//var sms = require('./lib/sms.js');
var log = require('./lib/intel.js');
var email = require('./lib/email.js');

exports.main = function(req, res)
{
  res.render('hacker');
  log.info('Open title page');
  sp.showCity(req);
};

exports.ajax = function(req, res)
{
  res.render('ajax');
  log.info('Ajax page open');
};

exports.api = function(req, res)
{
  var returnData = {
    result: req.body.boxText //return box text
  };

  res.send(returnData);
  log.info('Ajax reqwest: ' + JSON.stringify(req.body));
};

exports.mail = function(req, res)
{
  res.render('mail');
  log.info('Open mail page');
  sp.showCity(req);
}

exports.sendMail = function(req, res) 
{
  email.info(req.body.message, function(err) {
    if (err) {
      log.error(err);
      res.send({result: 'Mail NOT send =('});
    } else {
      res.send({result: 'Mail is send =)'});
    }
  });
}

exports.pin = function(req, res)
{
  res.render('pin');
  log.info('Pin page open');
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

exports.error404 = function(req, res) 
{
  res.render('error404');
  log.info('Wrong params: '+req.params[0]);
};
