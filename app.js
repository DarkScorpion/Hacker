var express = require('express'),
    app = express(), //create server Express
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon');

var sp = require('./suplib'); //connect support library

app.set('views/', __dirname); //for jade rendering
app.use(favicon('web/other/console.ico')); //icon of site
app.use(bodyParser.urlencoded({ extended: false })); //for ajax json
app.use(express.static(__dirname + '/web')); //for css and js files

app.get('/', function(req, res)
{
  res.render('hacker.jade');
  sp.showCity(req);
  sp.i('Open title page');

});

app.get('/ajax', function(req, res)
{
  res.render('ajax.jade');
  sp.i('Ajax page open');
});

app.post('/api', function(req, res)
{
  var returnData = {
    result: req.body.boxText //return box text
  };

  res.send(returnData);
  sp.i('Ajax reqwest: ' + JSON.stringify(req.body));
});

app.get('/mail', function(req, res)
{
  res.render('mail.jade');
  sp.i('Open mail page');
  sp.showCity(req);
});

app.post('/sendMail', function(req, res) 
{
  sp.info_email('From hcons.tk', req.body.msg, function(err) {
    if(err) {
      sp.e('Info mail is NOT send!');
      res.send({result: 'Mail NOT send =('});
    } else {
      res.send({result: 'Mail is send =)'});
    }
  });
})

app.get('/id=:id([0-9]+)', function(req, res) 
{
  res.send(req.params.id);
  sp.i('id='+req.params.id);
});

app.get('/name=:name;:last;', function(req, res)
{
  res.send('Hello '+req.params.name+' '+req.params.last);
  sp.i('Name='+req.params.name+' Last='+req.params.last);
});

app.get('/pin', function(req, res)
{
  res.render('pin.jade');
  sp.i('Pin page open');
});

app.get('/girl=:girlName;:imageUrl;', function(req, res) 
{
  sp.i('Open girls page!');
  res.render('girl.jade', 
  {
    gName: req.params.girlName,
    iUrl: req.params.imageUrl
  });
});

app.get('*', function(req, res) 
{
  res.render('error404.jade');
  sp.i('Wrong params: '+req.params[0]);
});

app.listen(process.env.VCAP_APP_PORT || 3000, function() {
  sp.i('NodeJS is runing');
});
