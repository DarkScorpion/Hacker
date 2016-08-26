
var app = require('./server.js');
var log = require('./lib/intel.js');

app.listen(process.env.VCAP_APP_PORT || 8080, function() {
  log.info('NodeJS is runing');
});
