var express = require('express'), app = express(); //Create server Express
var sp = require('./suplib'); //connect support library

app.set('views/', __dirname); //for Jade rendering
//app.use(express.bodyParser()); //for ajax json
app.use(express.favicon('web/console.ico')); //icon of site
app.use(express.static(__dirname + '/web')); //for css and js files

app.listen(process.env.VCAP_APP_PORT || 3000);

app.get('/', function(req, res)
{
  //sp.info_sms('Test sms');
  res.render('hacker.jade');
  sp.i('Open title page from ' + sp.getClientIP(req));
});

app.get('/ajax', function(req, res)
{
  res.render('ajax.jade');
  sp.i('Ajax page open');
});

app.post('/api', function(req, res)
{
  res.send(req.text);
  sp.i('Ajax reqwest: ' + req.text);
});


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

sp.i('NodeJS is runing');