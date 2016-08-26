'use strict';

//var sms = require('../lib/sms.js');
var log = require('../lib/intel.js');
var email = require('../lib/email.js');

exports.ajax = function(req, res)
{
  var returnData = {
    result: req.body.boxText //return box text
  };

  res.send(returnData);
  log.info('Ajax reqwest: ' + JSON.stringify(req.body));
};

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
