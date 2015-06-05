
var log = require('./intel.js');
var request = require('request');

var _config = require('../config.json');
var _apiKey = _config.sms_key;
var _infoPhone = _config.info_phone;

var sms = {

  info : function(text, callback)
  {
    this.send(text, _infoPhone, callback);
  },

  send : function(text, number, callback)
  {
    smsRequest(_apiKey, text, number, callback);
  }

};

module.exports = sms;


function smsRequest(key, text, number, callback)
{
  request({
  uri: 'http://sms.ru/sms/send',
  method: 'GET',
  query: {
    api_id: key,
    to: number,
    text: text
  },
  encoding: 'utf-8'
  }, function (err, res, body) {
    if (err) {
      callback(err)
    } else {
      callback(null, JSON.parse(body));
    }
  });
}
