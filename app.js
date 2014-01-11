var express = require('express');
var app = express();
var data = require('./data');

app.get('/', function(req, res) 
{
    res.send(data.Hello);
});

app.get('/id=:id([0-9]+)', function(req, res) 
{
	console.log('id='+req.params.id);
    res.send('id='+req.params.id);
});

app.get('/name=:name', function(req, res) 
{
    res.send('Hello '+req.params.name);
});

app.get('*', function(req, res) 
{
    res.send('what???', 404);
});
app.listen(process.env.VCAP_APP_PORT || 3000);
console.log('Node Express.js is runing!');