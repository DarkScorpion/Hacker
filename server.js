'use strict';

var express = require('express'),
    app = express(), //create server Express
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon');

var log = require('./lib/intel.js');
var routes = require('./routes.js');
var api = require('./api-routes.js');

app.set('view engine', 'jade'); //jade is default viewer
app.use(favicon('web/other/console.ico')); //icon of site
app.use(bodyParser.urlencoded({ extended: false })); //for ajax json
app.use(express.static('web')); //for css and js files

app.get('/', routes.main);
app.get('/ajax', routes.ajax);
app.get('/mail', routes.mail);
app.get('/pin', routes.pin);
app.get('/hello', routes.hello);
app.get('/id=:id([0-9]+)', routes.id);

app.post('/api/ajax', api.ajax);
app.post('/api/sendMail', api.sendMail);

app.get('*', routes.error404);

module.exports = app;
