var express = require('express'), app = express();//Create server
var supplib = require('./supplib');// connect supplib
app.set('views', __dirname); // for Jade rendering
app.use('/templates', express.static(__dirname + '/templates')); //for css files

app.get('/', function(req, res) 
{
	console.log('*Open title page*');
    res.render('./templates/index.jade', {});
});

app.get('/girl=:girlName;:imageUrl;', function(req, res) 
{
	console.log('!Open girls page!');
    res.render('./templates/girl.jade', 
    {
        gName: req.params.girlName,
        iUrl: req.params.imageUrl
    });
});

app.get('/id=:id([0-9]+)', function(req, res) 
{
	console.log('id='+req.params.id);
    res.send('id='+req.params.id);
});

app.get('/name=:name;:last', function(req, res)
{
    res.send('Hello '+req.params.name+' '+req.params.last);
    console.log('Name='+req.params.name+'; Last='+req.params.last);
});

app.get('*', function(req, res) 
{
    res.render('./templates/error404.jade',{});
    console.log('Wrong Params: '+req.params[0]);
});
app.listen(process.env.VCAP_APP_PORT || 3000);

console.log('Node Express.js is runing: '+ supplib.getTime());