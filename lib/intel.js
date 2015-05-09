var intel = require('intel');

intel.basicConfig({
  'format': '[%(date)s] %(levelname)s: %(message)s',
  'colorize': true
});

module.exports = intel;