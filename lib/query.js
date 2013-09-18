var querystring = require('querystring');

var formatter = function (config, next) {
  var query = config.query;
  if (query) {
    var queryString = querystring.stringify(query);

    if (config.method == 'GET') {
      config.path += '?' + queryString;
    } else {
      config.headers['content-type'] = 'application/x-www-form-urlencoded';
      config.body = queryString;
    }

    delete config.query;
  }

  return next();
};

module.exports = function (handlers, next) {
  handlers.before.push(formatter);

  return next();
};

