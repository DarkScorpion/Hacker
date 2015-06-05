
var log = require('./lib/intel.js');
var request = require('request');

module.exports = { //publick variables and metods of module

  getClientIP : function (req)
  {
    with(req)
      return (headers['x-forwarded-for'] || '').split(',')[0]
        || connection.remoteAddress;
  },

  showCity : function(req)
  {
    var IP = this.getClientIP(req);
    if (IP != '127.0.0.1') {
      getLocation(IP, function(err, location) {
        if (err) {
          log.error("Error: get location with IP: " + IP);
        } else {
          log.info(':> IP: '+location.ip+', Country: '+
            location.country.name_en+', City: '+location.city.name_en);
        }
      });
    }
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
