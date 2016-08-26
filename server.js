'use strict';

var express = require('express');
var app = express(); //create server Express
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var logMiddleware = require('./lib/util.js').logMiddleware;

var routes = require('./routes/');
var api = require('./routes/api.js');

app.set('view engine', 'jade'); //jade is default viewer
app.set('views', __dirname + '/views/'); //jade is default viewer
app.use( logMiddleware ); //login all request on server
app.use(favicon(__dirname + '/web/other/console.ico')); //icon of site
app.use( bodyParser.urlencoded({ extended: false }) ); //for ajax json
app.use( express.static(__dirname + '/web/') ); //for css and js files

app.get('/', routes.main);
app.get('/ajax', routes.ajax);
app.get('/mail', routes.mail);
app.get('/pin', routes.pin);
app.get('/hello', routes.hello);
app.get('/id=:id([0-9]+)', routes.id);

app.post('/api/ajax', api.ajax);
app.post('/api/sendMail', api.sendMail);

app.all('*', routes.err404);

module.exports = app;
