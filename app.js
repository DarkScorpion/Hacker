var express = require('express'),
    app = express(), //create server Express
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon');

var routes = require('./routes.js');

app.set('views/', __dirname); //for jade rendering
app.set('view engine', 'jade'); //jade is default viewer
app.use(favicon('web/other/console.ico')); //icon of site
app.use(bodyParser.urlencoded({ extended: false })); //for ajax json
app.use(express.static(__dirname + '/web')); //for css and js files

app.get('/', routes.index);

app.get('/ajax', routes.ajax);
app.post('/api', routes.api);

app.get('/mail', routes.mail);
app.post('/sendMail', routes.sendMail);

app.get('/pin', routes.pin);

app.get('/id=:id([0-9]+)', routes.id);
app.get('/name=:name;:last;', routes.name);
app.get('/girl=:girlName;:imageUrl;', routes.girl);

app.get('*', routes.error404);

app.listen(process.env.VCAP_APP_PORT || 3000, function() {
  console.log(new Date+' NodeJS is runing');
});
