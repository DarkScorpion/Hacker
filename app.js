var express = require('express'), app = express(); //Create server Express
var sp = require('./suplib'); //connect suplib.js (support library)

app.set('views', __dirname); //for Jade rendering
app.use(express.favicon('web/console.ico')); //icon of site
app.use(express.static(__dirname + '/web')); //for css and js files

app.listen(process.env.VCAP_APP_PORT || 3000);

app.get('/', function(req, res)
{
	res.render('./web/hacker.jade');
	console.log('%s Open title page',sp.getTime());
});

app.get('/girl=:girlName;:imageUrl;', function(req, res) 
{
	console.log('%s Open girls page!', sp.getTime());
	res.render('./web/girl.jade', 
    {
		gName: req.params.girlName,
		iUrl: req.params.imageUrl
    });
});

app.get('/id=:id([0-9]+)', function(req, res) 
{
	res.send(req.params.id);
	console.log('%s id='+req.params.id, sp.getTime());
});

app.get('/name=:name;:last;', function(req, res)
{
    res.send('Hello '+req.params.name+' '+req.params.last);
	console.log('%s Name='+req.params.name+'; Last='+req.params.last, sp.getTime());
});

app.get('*', function(req, res) 
{
    res.render('./web/error404.jade');
	console.log('%s Wrong Params: '+req.params[0], sp.getTime());
});

console.log('%s NodeJS is runing', sp.getTime());