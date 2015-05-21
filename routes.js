
var sp = require('./util.js');
var log = require('./lib/intel.js');

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
  sp.info_email('From hcons.tk', req.body.message, function(err) {
    if(err) {
      log.error('Info mail is NOT send!');
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
  res.send(req.params.id);
  log.info('id='+req.params.id);
};

exports.hello = function(req, res)
{
  var name = req.query.name;
  var lastName = req.query.last;

  res.send('Hello '+name+' '+lastName);
  log.info(req.query);
};

exports.girl = function(req, res) 
{
  log.info('Open girls page!');
  res.render('girl', {
    gName: req.params.girlName,
    iUrl: req.params.imageUrl
  });
};

exports.error404 = function(req, res) 
{
  res.render('error404');
  log.info('Wrong params: '+req.params[0]);
};
