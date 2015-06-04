
var log = require('./intel.js');
var request = require('request');
var mailgun = require('mailgun').Mailgun;

var _config = require('../config.json');
var _mg = new mailgun(_config.email_key);

var email = {

  info : function (subject, emailТext, callback)
  {
    this.send(_config.info_email, subject, emailТext, function(err) {
      if (err) callback(err);
        else callback(null);
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
