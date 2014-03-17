var express = require('express'), app = express(); //Create server Express
var supplib = require('./supplib'); //connect supplib.js

app.set('views', __dirname); //for Jade rendering
app.use(express.favicon('web/console.ico')); //icon of site
app.use(express.static(__dirname + '/web')); //for css and js files

app.listen(process.env.VCAP_APP_PORT || 3000);

app.get('/', function(req, res)
{
	console.log('> Open title page');
	res.render('./web/hacker.jade');
});

app.get('/girl=:girlName;:imageUrl;', function(req, res) 
{
	console.log('> Open girls page!');
	res.render('./web/girl.jade', 
    {
		gName: req.params.girlName,
		iUrl: req.params.imageUrl
    });
});

app.get('/id=:id([0-9]+)', function(req, res) 
{
	console.log('> id='+req.params.id);
	res.send(req.params.id);
});

app.get('/name=:name;:last;', function(req, res)
{
    res.send('Hello '+req.params.name+' '+req.params.last);
	console.log('Name='+req.params.name+'; Last='+req.params.last);
});

app.get('*', function(req, res) 
{
    res.render('./web/error404.jade');
	console.log('> Wrong Params: '+req.params[0]);
});

console.log('> NodeJS is runing: '+ supplib.getTime());