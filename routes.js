
var sp = require('./suplib'); //connect support library

exports.index = function(req, res)
{
  res.render('hacker');
  sp.showCity(req);
  sp.i('Open title page');
};

exports.ajax = function(req, res)
{
  res.render('ajax');
  sp.i('Ajax page open');
}

exports.api = function(req, res)
{
  var returnData = {
    result: req.body.boxText //return box text
  };

  res.send(returnData);
  sp.i('Ajax reqwest: ' + JSON.stringify(req.body));
}

exports.mail = function(req, res)
{
  res.render('mail');
  sp.i('Open mail page');
  sp.showCity(req);
}

exports.sendMail = function(req, res) 
{
  sp.info_email('From hcons.tk', req.body.msg, function(err) {
    if(err) {
      sp.e('Info mail is NOT send!');
      res.send({result: 'Mail NOT send =('});
    } else {
      res.send({result: 'Mail is send =)'});
    }
  });
}

exports.pin = function(req, res)
{
  res.render('pin');
  sp.i('Pin page open');
}

exports.id = function(req, res) 
{
  res.send(req.params.id);
  sp.i('id='+req.params.id);
}

exports.name = function(req, res)
{
  res.send('Hello '+req.params.name+' '+req.params.last);
  sp.i('Name='+req.params.name+' Last='+req.params.last);
}

exports.girl = function(req, res) 
{
  sp.i('Open girls page!');
  res.render('girl', 
  {
    gName: req.params.girlName,
    iUrl: req.params.imageUrl
  });
}

exports.error404 = function(req, res) 
{
  res.render('error404');
  sp.i('Wrong params: '+req.params[0]);
}