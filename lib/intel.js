var intel = require('intel');

intel.config({
  formatters: {
    'simple': {
      'format': '[%(date)s] %(levelname)s: %(message)s',
      'colorize': true
    }
  },
  handlers: {
    'terminal': {
      'class': intel.handlers.Console,
      'formatter': 'simple',
      'level': intel.VERBOSE
    }
  },
  loggers: {
    'console': {
      'handlers': ['terminal'],
      'handleExceptions': true,
      'exitOnError': false,
      'propagate': false
    }
  }
});

var consoleLogger = intel.getLogger('console');

module.exports = consoleLogger;
