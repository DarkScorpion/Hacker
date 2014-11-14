var http = require('http');
var colors = require('colors');

exports.i = function (str) //i = info
{
  console.log(iTime()+' '+str);
}

exports.d = function (str) //d = debug
{
  console.log(dTime()+' '+str);
}

exports.info_sms = function (text)
{
  var isSend = '???';
  var isVariableCorrect = (typeof process.env.sms_key !== 'undefined'
    && typeof process.env.phone !== 'undefined');

  if (isVariableCorrect){
    httpSmsRequest(process.env.sms_key, process.env.phone, text);
    isSend = ' Sms SEND:'.green;
  }
  else isSend = ' Sms NOT send:'.red;
  
  console.log(iTime() + isSend + '\n\t' + text);
}

exports.getClientIP = function (req)
{ 
  with(req)
    return (headers['x-forwarded-for'] || '').split(',')[0] 
      || connection.remoteAddress;
}

function httpSmsRequest(key, phone, text)
{
  var smsUrl = 'http://sms.ru/sms/send?api_id=' + key +
    '&to=' + phone +
    '&text=' + text.replace(' ', '+');

  http.get(smsUrl, function(res){
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