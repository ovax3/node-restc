module.exports = function (res, next) {
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
