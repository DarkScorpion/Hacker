'use strict';

var log = require('./intel.js');
var request = require('request');
var mailgun = require('mailgun').Mailgun;

var _config = require('../config.json');
var _mg = new mailgun(_config.email_key);
var _infoMail = _config.info_email;

var email = {

  info : function (emailТext, callback)
  {
    this.send(_infoMail, 'Info mail', emailТext, function(err) {
      callback(err);
    });
  },

  send : function (recipient, subject, emailТext, callback)
  {
    var standartFrom = 'nodejs@mySite.com'

    _mg.sendText(standartFrom, recipient, subject, emailТext, standartFrom,
      {}, function(err) {
      if (err) {
        callback(err);
      } else {
        log.info('Mail is SEND to '+recipient+' subject: '+subject);
        callback(null);
      }
    });
  }

};

module.exports = email;
