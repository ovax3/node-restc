var requestLogger = function (config, next) {
  var headers = config.headers;
  var host = headers.Host || config.hostname;
  console.log('<- ' + config.method + ' ' + host + config.path);
  var ctype = headers['content-type'];
  if (ctype == 'application/json' && config.data !== undefined) {
    console.log(JSON.stringify(config.data, undefined, 2));
  } else if (config.body !== undefined) {
    console.log(config.body);
  } else if (config.data !== undefined) {
    console.log(config.data);
  }

  return next();
};

var responseLogger = function (res, next) {
  var config = res.config;
  var host = config.headers.Host || config.hostname;
  console.log('-> ' + config.method + ' ' + host + config.path);
  console.log(res.statusCode);
  var headers = res.headers;
  var ctype = headers['content-type'];
  if (ctype == 'application/json' && res.data !== undefined) {
    console.log(JSON.stringify(res.data, undefined, 2));
  } else if (res.body !== undefined) {
    console.log(res.body);
  }

  return next();
};

module.exports = function (handlers, next) {
  handlers.before.push(requestLogger);
  handlers.after.push(responseLogger);

  return next();
};

