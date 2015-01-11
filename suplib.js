var http = require('http');
var colors = require('colors');
var request = require('request');
var Mailgun = require('mailgun').Mailgun;

var config = require('./config.json');
var mg = new Mailgun(config.email_key);

module.exports = { //publick variables and metods of module
  
  info_email : function (subject, emailТext)
  {
    this.sendEmail(config.info_email, subject, emailТext);
  },

  sendEmail : function (recipient, subject, emailТext)
  {
    var standartFrom = 'nodejs@mySite.com'

    mg.sendText(standartFrom, recipient, subject, emailТext, standartFrom, {},
    function(err) {
      if (err) this.e(err);
        else this.i('Mail is SEND to '+recipient+' subject: '+subject);
    });
  },

  info_sms : function (text)
  {
    var isSend = '???';
    var isVariableCorrect = (typeof process.env.sms_key !== 'undefined'
      && typeof process.env.phone !== 'undefined');

    if (isVariableCorrect) {
      httpSmsRequest(process.env.sms_key, process.env.phone, text);
      isSend = ' Sms SEND:'.green;
    }
    else isSend = ' Sms NOT send:'.red;
    
    console.log(iTime() + isSend + '\n\t' + text);
  },

  getClientIP : function (req)
  {
    with(req)
      return (headers['x-forwarded-for'] || '').split(',')[0]
        || connection.remoteAddress;
  },

  showCity : function(req)
  {
    var IP = this.getClientIP(req);
    if (IP != '127.0.0.1') {
      getLocation(IP, function(err, location) { //getLocation(getClientIP(req));
        if (err) {
          this.e("error");
          return;
        } else {
          console.log('> IP: '+location.ip+', Country: '+
            location.country.name_en+', City: '+location.city.name_en);
        }
      });
    }
  },

  i : function (str) //i = info
  {
    console.log(iTime()+' '+str);
  },

  d : function (str) //d = debug
  {
    console.log(dTime()+' '+str);
  },

  e : function(str) //e = error
  {
    console.log( (dTime()+' '+str).red );
  }

}; //end of module

//Private metods of module
function  getLocation (ip, callback)
{
  request({
    uri: 'http://api.sypexgeo.net/json/'+ip,
    method: 'GET',
    encoding: 'utf-8'
    }, function (err, res, body) {
      if (err) {
        callback(err)
      } else {
        callback(null, JSON.parse(body));
      }
  });
}

function httpSmsRequest(key, phone, text)
{
  var sendSmsUrl = 'http://sms.ru/sms/send?api_id=' + key +
    '&to=' + phone +
    '&text=' + text.replace(' ', '+');

  http.get(sendSmsUrl, function(res) {
    console.log('Response sms: ' + res);
  });
}

function iTime()
{
  var d = new Date();
  var s = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
  var t = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
  return '['+s+' '+t+']';
}

function dTime()
{
  var d = new Date();
  var s = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
  var t = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+':'+d.getMilliseconds();
  return '['+s+' '+t+']';
}