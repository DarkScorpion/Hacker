'use strict';

var request = require('request');
var log = require('./intel.js');

module.exports = { //publick variables and methods of module

  getClientIP : function (req)
  {
    return (req.headers['x-forwarded-for'] || '').split(',')[0]
      || req.connection.remoteAddress;
  },

  getLocationInfoString: function (req, callback)
  {
    var IP = this.getClientIP(req);
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

  showCity : function(req)
  {
    this.getLocationInfoString(req, function (str) {
      log.info('>>'+str);
    });
  }

}; //end of module

//Private metods of module
function  getLocation (ip, callback)
{
  request({
    uri: 'http://api.sypexgeo.net/json/'+ip,
    method: 'GET',
    encoding: 'utf-8'
    }, function (err, res, body) {
      if (err) {
        callback(err)
      } else {
        callback(null, JSON.parse(body));
      }
  });
}
