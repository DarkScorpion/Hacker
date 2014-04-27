var express = require('express'), app = express(); //Create server Express
var sp = require('./suplib'); //connect suplib.js (support library)

app.set('views', __dirname); //for Jade rendering
app.use(express.favicon('web/console.ico')); //icon of site
app.use(express.static(__dirname + '/web')); //for css and js files
//app.use(express.basicAuth('a_name', 'A_PASS')); //authorization connect

app.listen(process.env.VCAP_APP_PORT || 3000);

app.get('/', function(req, res)
{
	res.render('./web/hacker.jade');
	sp.info('Open title page from ' + sp.getClientIP(req));
});

app.get('/girl=:girlName;:imageUrl;', function(req, res) 
{
	sp.info('Open girls page!');
	res.render('./web/girl.jade', 
    {
		gName: req.params.girlName,
		iUrl: req.params.imageUrl
    });
});

app.get('/id=:id([0-9]+)', function(req, res) 
{
	res.send(req.params.id);
	sp.info('id='+req.params.id);
});

app.get('/name=:name;:last;', function(req, res)
{
    res.send('Hello '+req.params.name+' '+req.params.last);
	sp.info('Name='+req.params.name+' Last='+req.params.last);
});

app.get('*', function(req, res) 
{
    res.render('./web/error404.jade');
	sp.info('Wrong params: '+req.params[0]);
});

sp.info('NodeJS is runing');