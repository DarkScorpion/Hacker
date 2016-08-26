'use strict';

var log = require('./intel.js');
var request = require('request');

module.exports = { //publick variables and methods of module

  logMiddleware: function (req, res, next)
  {
    log.info('%s %s %s', req.method, req.path, req.ip);
    next();
  },

  getLocationInfoString: function (req, callback)
  {
    var IP = req.ip;
    if (IP != '127.0.0.1') {
      getLocation(IP, function(err, location) {
        if (err) {
          log.error("Can't get location with IP: " + IP);
        } else {
          var city = location.city.name_en || '???';
          var country = location.country.name_en || '???';

          var result = 'IP: '+IP+', Country: '+country+', City: '+city;
          callback(result);
        }
      });
    }
  },

  showCity: function(req)
  {
    this.getLocationInfoString(req, function (str) {
      log.info('>>'+str);
    });
  }

}; //end of module

//Private metods of module
function getLocation (ip, callback)
{
  request({
    uri: 'http://api.sypexgeo.net/json/'+ip,
    method: 'GET',
    encoding: 'utf-8'
    }, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        callback( null, JSON.parse(body) );
      } else {
        callback(err);
      }
  });
}
