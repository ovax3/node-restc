module.exports = function (config, next) {
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
